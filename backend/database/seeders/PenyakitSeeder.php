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
            ['kode' => 'P01', 'nama' => 'Flu Kucing (Cat Flu)', 'deskripsi' => 'Infeksi saluran pernapasan atas yang disebabkan oleh virus herpes atau calicivirus.', 'solusi' => 'Isolasi kucing, berikan antibiotik jika ada infeksi sekunder, pastikan hidrasi cukup.'],
            ['kode' => 'P02', 'nama' => 'FIP (Feline Infectious Peritonitis)', 'deskripsi' => 'Penyakit fatal yang disebabkan mutasi coronavirus pada kucing.', 'solusi' => 'Konsultasi dokter hewan, perawatan suportif, GS-441524 antiviral.'],
            ['kode' => 'P03', 'nama' => 'Konjungtivitis', 'deskripsi' => 'Peradangan selaput konjungtiva mata yang menyebabkan mata merah dan berair.', 'solusi' => 'Tetes mata antibiotik, bersihkan sekret mata, hindari iritan.'],
            ['kode' => 'P04', 'nama' => 'Scabies (Mange)', 'deskripsi' => 'Infestasi tungau Notoedres cati yang menyebabkan gatal parah.', 'solusi' => 'Ivermectin atau selamectin, mandi antiseptik, bersihkan lingkungan.'],
            ['kode' => 'P05', 'nama' => 'Ringworm (Dermatofitosis)', 'deskripsi' => 'Infeksi jamur pada kulit, rambut, dan kuku kucing.', 'solusi' => 'Antijamur oral atau topikal, shampo antijamur, isolasi dari hewan lain.'],
            ['kode' => 'P06', 'nama' => 'Panleukopenia', 'deskripsi' => 'Parvovirus kucing yang sangat menular dan mematikan.', 'solusi' => 'Rawat inap, cairan IV, perawatan suportif intensif, vaksinasi preventif.'],
            ['kode' => 'P07', 'nama' => 'FeLV (Feline Leukemia Virus)', 'deskripsi' => 'Retrovirus yang menekan sistem imun dan menyebabkan kanker.', 'solusi' => 'Manajemen gejala, peningkat imun, isolasi dari kucing lain.'],
            ['kode' => 'P08', 'nama' => 'Otitis (Infeksi Telinga)', 'deskripsi' => 'Peradangan telinga akibat bakteri, jamur, atau tungau.', 'solusi' => 'Pembersihan telinga, tetes antibiotik/antijamur, pemeriksaan rutin.'],
            ['kode' => 'P09', 'nama' => 'Diabetes Mellitus', 'deskripsi' => 'Gangguan metabolisme glukosa akibat defisiensi insulin.', 'solusi' => 'Injeksi insulin, diet rendah karbohidrat, monitoring glukosa darah.'],
            ['kode' => 'P10', 'nama' => 'Penyakit Ginjal Kronis', 'deskripsi' => 'Kerusakan progresif fungsi ginjal pada kucing.', 'solusi' => 'Terapi cairan, diet khusus ginjal, fosfat binder, monitoring BUN/kreatinin.'],
            ['kode' => 'P11', 'nama' => 'Hipertiroidisme', 'deskripsi' => 'Produksi hormon tiroid berlebihan akibat adenoma tiroid.', 'solusi' => 'Methimazole, yodium radioaktif, atau pembedahan tiroid.'],
            ['kode' => 'P12', 'nama' => 'Toksoplasma', 'deskripsi' => 'Infeksi parasit Toxoplasma gondii pada jaringan tubuh.', 'solusi' => 'Clindamycin atau trimethoprim-sulfamethoxazole selama 4 minggu.'],
            ['kode' => 'P13', 'nama' => 'Anemia Hemolitik', 'deskripsi' => 'Destruksi sel darah merah berlebihan menyebabkan anemia berat.', 'solusi' => 'Transfusi darah, kortikosteroid, identifikasi dan obati penyebab dasar.'],
        ];

        DB::table('penyakits')->insert($penyakits);
    }
}
