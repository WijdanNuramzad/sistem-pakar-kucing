<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PenyakitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $penyakits = [
            ['kode' => 'PK01', 'nama' => 'Flu Kucing (Feline Rhinotracheitis/Calicivirus)', 'deskripsi' => 'Flu Kucing', 'solusi' => '-'],
            ['kode' => 'PK02', 'nama' => 'Scabies (Kudis)', 'deskripsi' => 'Scabies', 'solusi' => '-'],
            ['kode' => 'PK03', 'nama' => 'Cacingan', 'deskripsi' => 'Cacingan', 'solusi' => '-'],
            ['kode' => 'PK04', 'nama' => 'Panleukopenia (Distemper Kucing)', 'deskripsi' => 'Panleukopenia', 'solusi' => '-'],
            ['kode' => 'PK05', 'nama' => 'Ringworm (Jamur Kulit)', 'deskripsi' => 'Ringworm', 'solusi' => '-'],
            ['kode' => 'PK06', 'nama' => 'Otitis (Infeksi Telinga)', 'deskripsi' => 'Otitis', 'solusi' => '-'],
            ['kode' => 'PK07', 'nama' => 'FLUTD (Infeksi Saluran Kemih)', 'deskripsi' => 'FLUTD', 'solusi' => '-'],
            ['kode' => 'PK08', 'nama' => 'Ear Mites (Kutu Telinga)', 'deskripsi' => 'Ear Mites', 'solusi' => '-'],
            ['kode' => 'PK09', 'nama' => 'Konjungtivitis (Infeksi Mata)', 'deskripsi' => 'Konjungtivitis', 'solusi' => '-'],
            ['kode' => 'PK10', 'nama' => 'Feline Infectious Peritonitis (FIP)', 'deskripsi' => 'FIP', 'solusi' => '-'],
            ['kode' => 'PK11', 'nama' => 'Flea (Kutu Badan)', 'deskripsi' => 'Flea', 'solusi' => '-'],
            ['kode' => 'PK12', 'nama' => 'Feline Leukemia Virus', 'deskripsi' => 'Feline Leukemia Virus', 'solusi' => '-'],
            ['kode' => 'PK13', 'nama' => 'Jamur Cryptococus', 'deskripsi' => 'Jamur Cryptococus', 'solusi' => '-'],
        ];

        DB::table('penyakits')->delete();
        DB::table('penyakits')->insert($penyakits);
    }
}
