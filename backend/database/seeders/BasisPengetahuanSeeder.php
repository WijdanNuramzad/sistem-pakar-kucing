<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Penyakit;
use App\Models\Gejala;

class BasisPengetahuanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('basis_pengetahuan')->delete();

        $rules = [
            'PK01' => ['GJ01', 'GJ02', 'GJ03', 'GJ04', 'GJ05', 'GJ06', 'GJ07', 'GJ08', 'GJ09', 'GJ10'],
            'PK02' => ['GJ22', 'GJ23'],
            'PK03' => ['GJ18', 'GJ19', 'GJ14', 'GJ11', 'GJ05', 'GJ21', 'GJ24'],
            'PK04' => ['GJ12', 'GJ15', 'GJ06', 'GJ16', 'GJ17', 'GJ19', 'GJ20', 'GJ08', 'GJ10'],
            'PK05' => ['GJ24', 'GJ25', 'GJ22', 'GJ26'],
            'PK06' => ['GJ27', 'GJ28', 'GJ29'],
            'PK07' => ['GJ30', 'GJ31', 'GJ32'],
            'PK08' => ['GJ33', 'GJ34', 'GJ27'],
            'PK09' => ['GJ05', 'GJ04'],
            'PK10' => ['GJ11', 'GJ12', 'GJ13', 'GJ14', 'GJ21'],
            'PK11' => ['GJ22', 'GJ24', 'GJ26'],
            'PK12' => ['GJ02', 'GJ35', 'GJ36'],
            'PK13' => ['GJ37', 'GJ03', 'GJ38', 'GJ36', 'GJ39'],
        ];

        $penyakits = Penyakit::all()->keyBy('kode');
        $gejalas = Gejala::all()->keyBy('kode');

        $mappings = [];

        foreach ($rules as $kodePenyakit => $kodeGejalas) {
            $penyakit = $penyakits->get($kodePenyakit);
            if (!$penyakit) continue;

            foreach ($kodeGejalas as $kodeGejala) {
                $gejala = $gejalas->get($kodeGejala);
                if (!$gejala) continue;

                $mappings[] = [
                    'penyakit_id' => $penyakit->id,
                    'gejala_id' => $gejala->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        DB::table('basis_pengetahuan')->insert($mappings);
    }
}
