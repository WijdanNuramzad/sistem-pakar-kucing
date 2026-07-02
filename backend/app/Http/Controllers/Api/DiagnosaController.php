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
        
        $totalPenyakit = $penyakits->count();
        if ($totalPenyakit === 0) {
            return response()->json(['message' => 'Basis pengetahuan kosong'], 400);
        }

        $priorProb = 1.0 / $totalPenyakit;
        
        $hasilPerPenyakit = [];
        $totalNumerator = 0;

        foreach ($penyakits as $penyakit) {
            $ruleGejalaIds = $penyakit->gejalas->pluck('id')->toArray();
            $gejalaMap = $penyakit->gejalas->keyBy('id');
            
            $numerator = $priorProb;
            $detailGejala = [];

            foreach ($selectedGejalaIds as $gId) {
                if (in_array($gId, $ruleGejalaIds)) {
                    // Gejala ada di rule penyakit ini, gunakan bobot
                    $bobot = $gejalaMap[$gId]->bobot;
                } else {
                    // Gejala tidak ada di rule, beri probabilitas sangat kecil (bukan 0 agar tidak merusak perkalian)
                    $bobot = 0.001; 
                }
                $numerator *= $bobot;
                
                $detailGejala[] = [
                    'gejala_id' => $gId,
                    'bobot_digunakan' => $bobot
                ];
            }
            
            $hasilPerPenyakit[] = [
                'penyakit' => $penyakit,
                'numerator' => $numerator,
                'detail_gejala' => $detailGejala
            ];
            
            $totalNumerator += $numerator;
        }

        // Normalisasi
        $ranking = [];
        foreach ($hasilPerPenyakit as $hasil) {
            $probabilitas = 0;
            if ($totalNumerator > 0) {
                $probabilitas = ($hasil['numerator'] / $totalNumerator) * 100;
            }
            
            $ranking[] = [
                'penyakit_id' => $hasil['penyakit']->id,
                'kode' => $hasil['penyakit']->kode,
                'nama' => $hasil['penyakit']->nama,
                'deskripsi' => $hasil['penyakit']->deskripsi,
                'solusi' => $hasil['penyakit']->solusi,
                'probabilitas' => round($probabilitas, 2),
                'numerator' => reset($hasil['detail_gejala']) ? $hasil['numerator'] : 0, // avoid warning, although numerator is calculated
                'detail_gejala' => $hasil['detail_gejala']
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
            'prior_prob' => $priorProb,
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
