<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Penyakit;
use App\Models\Gejala;
use App\Models\BasisPengetahuan;
use App\Models\RiwayatDiagnosa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Statistik Total
        $totalPenyakit = Penyakit::count();
        $totalGejala = Gejala::count();
        // Total Rule didefinisikan sebagai jumlah penyakit unik yang ada di basis pengetahuan
        $totalRule = BasisPengetahuan::distinct('penyakit_id')->count('penyakit_id');
        $totalRiwayat = RiwayatDiagnosa::count();

        // 2. Penyakit Terbanyak Didiagnosa (Distribusi)
        $penyakitFreqRaw = RiwayatDiagnosa::select('penyakit_id', DB::raw('count(*) as count'))
            ->whereNotNull('penyakit_id')
            ->groupBy('penyakit_id')
            ->orderByDesc('count')
            ->limit(10)
            ->get();
            
        $penyakitFreq = [];
        foreach ($penyakitFreqRaw as $item) {
            $penyakit = Penyakit::find($item->penyakit_id);
            if ($penyakit) {
                $penyakitFreq[] = [
                    'kode' => $penyakit->kode,
                    'nama' => $penyakit->nama,
                    'count' => $item->count
                ];
            }
        }

        // 3. Diagnosa per Bulan (Tahun Berjalan)
        $currentYear = date('Y');
        $monthlyDataRaw = RiwayatDiagnosa::select(
                DB::raw('MONTH(created_at) as bulan'),
                DB::raw('count(*) as jumlah')
            )
            ->whereYear('created_at', $currentYear)
            ->groupBy('bulan')
            ->orderBy('bulan')
            ->get();

        $bulanNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
        $monthlyData = [];
        
        // Inisialisasi semua bulan menjadi 0
        for ($i = 1; $i <= 12; $i++) {
            $monthlyData[$i] = [
                'bulan' => $bulanNames[$i-1],
                'jumlah' => 0
            ];
        }

        // Isi data riil
        foreach ($monthlyDataRaw as $data) {
            $monthlyData[$data->bulan]['jumlah'] = $data->jumlah;
        }

        // 4. Riwayat Diagnosa Terbaru (5 terakhir)
        $recentRiwayat = RiwayatDiagnosa::with('penyakit')
            ->latest()
            ->limit(5)
            ->get()
            ->map(function($r) {
                // Tentukan status
                $status = "Rendah";
                if ($r->probabilitas >= 80) $status = "Sangat Tinggi";
                else if ($r->probabilitas >= 60) $status = "Tinggi";
                else if ($r->probabilitas >= 40) $status = "Sedang";
                
                return [
                    'id' => $r->id,
                    'tgl' => $r->created_at->format('d M Y'),
                    'pemilik' => $r->nama_pemilik,
                    'kucing' => $r->nama_kucing,
                    'hasil' => $r->penyakit ? $r->penyakit->nama : 'Tidak diketahui',
                    'persen' => round($r->probabilitas, 1),
                    'status' => $status
                ];
            });

        return response()->json([
            'stats' => [
                'totalPenyakit' => $totalPenyakit,
                'totalGejala' => $totalGejala,
                'totalRule' => $totalRule,
                'totalDiagnosa' => $totalRiwayat
            ],
            'diseaseFreq' => $penyakitFreq,
            'monthlyData' => array_values($monthlyData),
            'recentRiwayat' => $recentRiwayat
        ]);
    }
}
