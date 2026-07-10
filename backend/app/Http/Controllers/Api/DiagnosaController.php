<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Penyakit;
use App\Models\Gejala;
use App\Models\RiwayatDiagnosa;
use Illuminate\Http\Request;

class DiagnosaController extends Controller
{
    /**
     * Hitung diagnosa menggunakan Teorema Bayes
     * Body: { nama_pemilik, nama_kucing, umur_kucing, jenis_kelamin, gejala_ids }
     */
    /**
     * Klasifikasi kesimpulan berdasarkan persentase
     */
    private function getKesimpulan(float $persen): string
    {
        if ($persen >= 80) return 'Pasti';
        if ($persen >= 60) return 'Hampir Pasti';
        if ($persen >= 40) return 'Kemungkinan Besar';
        if ($persen >= 20) return 'Mungkin';
        return 'Tidak Yakin';
    }

    public function hitung(Request $request)
    {
        $validated = $request->validate([
            'nama_pemilik' => 'required|string',
            'nama_kucing' => 'required|string',
            'umur_kucing' => 'nullable|string',
            'jenis_kelamin' => 'required|string',
            'gejala_ids' => 'required|array|min:1',
            'gejala_ids.*' => 'exists:gejalas,id',
        ]);

        $selectedGejalaIds = $validated['gejala_ids'];
        
        // Ambil semua penyakit yang memiliki rule (ada gejala terdaftar)
        $penyakits = Penyakit::with('gejalas')->whereHas('gejalas')->get();
        
        if ($penyakits->count() === 0) {
            return response()->json(['message' => 'Basis pengetahuan kosong'], 400);
        }

        $ranking = [];

        foreach ($penyakits as $penyakit) {
            $ruleGejalaIds = $penyakit->gejalas->pluck('id')->toArray();
            $gejalaMap = $penyakit->gejalas->keyBy('id');
            
            // Cari gejala yang cocok (irisan antara gejala dipilih dan rule penyakit)
            $matchingGejalaIds = array_intersect($selectedGejalaIds, $ruleGejalaIds);
            
            if (empty($matchingGejalaIds)) {
                // Tidak ada gejala cocok, skor = 0
                $ranking[] = [
                    'penyakit_id' => $penyakit->id,
                    'kode' => $penyakit->kode,
                    'nama' => $penyakit->nama,
                    'deskripsi' => $penyakit->deskripsi,
                    'solusi' => $penyakit->solusi,
                    'probabilitas' => 0,
                    'kesimpulan' => $this->getKesimpulan(0),
                    'total_bobot' => 0,
                    'total_evidence' => 0,
                    'total_suku_akhir' => 0,
                    'detail_gejala' => []
                ];
                continue;
            }
            
            // ─── Langkah 1: Hitung total bobot gejala yang cocok ─────────
            $totalBobot = 0;
            $matchingData = [];
            foreach ($matchingGejalaIds as $gId) {
                $bobot = (float) $gejalaMap[$gId]->bobot;
                $totalBobot += $bobot;
                $matchingData[] = ['gejala_id' => $gId, 'bobot' => $bobot];
            }
            
            // ─── Langkah 2: Prior P(Hi) & Likelihood (Evidence) ──────────
            // Prior P(Hi) = bobot / totalBobot
            // Likelihood  = Prior × bobot
            $detailGejala = [];
            $totalEvidence = 0;
            foreach ($matchingData as $mg) {
                $prior = $mg['bobot'] / $totalBobot;
                $likelihood = $prior * $mg['bobot'];
                $totalEvidence += $likelihood;
                $detailGejala[] = [
                    'gejala_id' => $mg['gejala_id'],
                    'bobot' => $mg['bobot'],
                    'prior' => round($prior, 4),
                    'likelihood' => round($likelihood, 4),
                    'posterior' => 0,    // akan diisi di langkah berikutnya
                    'suku_akhir' => 0,   // akan diisi di langkah berikutnya
                ];
            }
            
            // ─── Langkah 3: Posterior P(Hi|E) & Suku Akhir ───────────────
            // Posterior   = Likelihood / totalEvidence
            // Suku Akhir  = Posterior × bobot
            $totalSukuAkhir = 0;
            foreach ($detailGejala as &$dg) {
                $dg['posterior'] = $totalEvidence > 0 ? round($dg['likelihood'] / $totalEvidence, 4) : 0;
                $dg['suku_akhir'] = round($dg['posterior'] * $dg['bobot'], 4);
                $totalSukuAkhir += $dg['suku_akhir'];
            }
            unset($dg); // unset reference
            
            // ─── Langkah 4: Hasil Persentase ─────────────────────────────
            $hasilPersentase = round($totalSukuAkhir * 100, 2);
            
            $ranking[] = [
                'penyakit_id' => $penyakit->id,
                'kode' => $penyakit->kode,
                'nama' => $penyakit->nama,
                'deskripsi' => $penyakit->deskripsi,
                'solusi' => $penyakit->solusi,
                'probabilitas' => $hasilPersentase,
                'kesimpulan' => $this->getKesimpulan($hasilPersentase),
                'total_bobot' => round($totalBobot, 4),
                'total_evidence' => round($totalEvidence, 4),
                'total_suku_akhir' => round($totalSukuAkhir, 4),
                'detail_gejala' => $detailGejala
            ];
        }

        // Sort by probabilitas descending
        usort($ranking, function ($a, $b) {
            return $b['probabilitas'] <=> $a['probabilitas'];
        });

        $topResult = $ranking[0];

        // Ambil detail gejala yang dipilih untuk disimpan/dikembalikan
        $gejalaDipilihObj = Gejala::whereIn('id', $selectedGejalaIds)->get(['id', 'kode', 'nama', 'bobot']);

        // Simpan ke riwayat
        $riwayat = RiwayatDiagnosa::create([
            'nama_pemilik' => $validated['nama_pemilik'],
            'nama_kucing' => $validated['nama_kucing'],
            'umur_kucing' => $validated['umur_kucing'] ?? '',
            'jenis_kelamin' => $validated['jenis_kelamin'],
            'penyakit_id' => $topResult['penyakit_id'],
            'probabilitas' => $topResult['probabilitas'],
            'gejala_dipilih' => $gejalaDipilihObj,
            'hasil_lengkap' => $ranking,
        ]);

        return response()->json([
            'riwayat_id' => $riwayat->id,
            'top_penyakit' => $topResult,
            'ranking' => $ranking,
            'gejala_dipilih' => $gejalaDipilihObj,
        ]);
    }

    /**
     * Dapatkan semua riwayat diagnosa
     */
    public function riwayat()
    {
        $riwayat = RiwayatDiagnosa::with('penyakit')->latest()->get();
        return response()->json($riwayat);
    }

    /**
     * Hapus riwayat
     */
    public function destroyRiwayat($id)
    {
        $riwayat = RiwayatDiagnosa::findOrFail($id);
        $riwayat->delete();
        return response()->json(['message' => 'Riwayat berhasil dihapus']);
    }
}
