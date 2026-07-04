<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BasisPengetahuanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $penyakits = \App\Models\Penyakit::all();
        $gejalas = \App\Models\Gejala::all();

        if ($penyakits->isEmpty() || $gejalas->isEmpty()) {
            return;
        }

        // Mapping dummy sederhana (misal, setiap penyakit punya 3-5 gejala yang berbeda)
        $mappings = [];
        
        foreach ($penyakits as $index => $penyakit) {
            // Ambil 4 gejala per penyakit berdasarkan indeks agar distribusinya merata tapi tumpang tindih
            $startIndex = ($index * 3) % $gejalas->count();
            
            for ($i = 0; $i < 4; $i++) {
                $gejalaIndex = ($startIndex + $i) % $gejalas->count();
                $gejalaId = $gejalas[$gejalaIndex]->id;
                
                $mappings[] = [
                    'penyakit_id' => $penyakit->id,
                    'gejala_id' => $gejalaId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        // Hapus duplikat just in case
        $mappings = collect($mappings)->unique(function ($item) {
            return $item['penyakit_id'] . '-' . $item['gejala_id'];
        })->toArray();

        \Illuminate\Support\Facades\DB::table('basis_pengetahuan')->insert($mappings);
    }
}
