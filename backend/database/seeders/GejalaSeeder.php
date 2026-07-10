<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GejalaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $gejalas = [
            ['kode' => 'GJ01', 'nama' => 'Bersin-bersin', 'bobot' => 0.6],
            ['kode' => 'GJ02', 'nama' => 'Demam', 'bobot' => 0.3],
            ['kode' => 'GJ03', 'nama' => 'Keluar ingus / Pilek', 'bobot' => 0.7],
            ['kode' => 'GJ04', 'nama' => 'Radang mata / Peradangan selaput lendir', 'bobot' => 0.8],
            ['kode' => 'GJ05', 'nama' => 'Mata berair / Belekan', 'bobot' => 0.6],
            ['kode' => 'GJ06', 'nama' => 'Tidak mau makan / Nafsu makan turun', 'bobot' => 0.6],
            ['kode' => 'GJ07', 'nama' => 'Dehidrasi', 'bobot' => 0.4],
            ['kode' => 'GJ08', 'nama' => 'Air ludah yang berlebihan (Ngeces)', 'bobot' => 0.6],
            ['kode' => 'GJ09', 'nama' => 'Sesak nafas', 'bobot' => 0.4],
            ['kode' => 'GJ10', 'nama' => 'Batuk-batuk', 'bobot' => 0.3],
            ['kode' => 'GJ11', 'nama' => 'Perut membesar / Buncit', 'bobot' => 0.7],
            ['kode' => 'GJ12', 'nama' => 'Depresi / Murung', 'bobot' => 0.5],
            ['kode' => 'GJ13', 'nama' => 'Terlihat seperti sakit kuning (Jaundice)', 'bobot' => 0.9],
            ['kode' => 'GJ14', 'nama' => 'Berat badan menurun / Kurus walau banyak makan', 'bobot' => 0.7],
            ['kode' => 'GJ15', 'nama' => 'Lemas', 'bobot' => 0.6],
            ['kode' => 'GJ16', 'nama' => 'Muntah (cairan atau makanan)', 'bobot' => 0.6],
            ['kode' => 'GJ17', 'nama' => 'Diare cair / Diare', 'bobot' => 0.8],
            ['kode' => 'GJ18', 'nama' => 'Keluar cacing pada kotoran / Muntah cacing', 'bobot' => 0.9],
            ['kode' => 'GJ19', 'nama' => 'Diare berdarah', 'bobot' => 0.7],
            ['kode' => 'GJ20', 'nama' => 'Diare bau amis', 'bobot' => 0.6],
            ['kode' => 'GJ21', 'nama' => 'Bulu kusam', 'bobot' => 0.5],
            ['kode' => 'GJ22', 'nama' => 'Gatal-gatal', 'bobot' => 0.7],
            ['kode' => 'GJ23', 'nama' => 'Keropeng di daerah telinga, kaki, dan muka', 'bobot' => 0.7],
            ['kode' => 'GJ24', 'nama' => 'Bulu rontok / Pitak melingkar', 'bobot' => 0.7],
            ['kode' => 'GJ25', 'nama' => 'Kulit ketombe', 'bobot' => 0.7],
            ['kode' => 'GJ26', 'nama' => 'Kemerahan di kulit', 'bobot' => 0.5],
            ['kode' => 'GJ27', 'nama' => 'Telinga sakit', 'bobot' => 0.6],
            ['kode' => 'GJ28', 'nama' => 'Keluar nanah/cairan dari telinga', 'bobot' => 0.8],
            ['kode' => 'GJ29', 'nama' => 'Bau busuk dari telinga', 'bobot' => 0.7],
            ['kode' => 'GJ30', 'nama' => 'Pipis tidak lancar / Tidak bisa pipis', 'bobot' => 0.8],
            ['kode' => 'GJ31', 'nama' => 'Sering bolak-balik ke litter box', 'bobot' => 0.5],
            ['kode' => 'GJ32', 'nama' => 'Pipis berdarah', 'bobot' => 0.8],
            ['kode' => 'GJ33', 'nama' => 'Sering garuk-garuk telinga', 'bobot' => 0.6],
            ['kode' => 'GJ34', 'nama' => 'Kotoran telinga seperti serbuk hitam/coklat', 'bobot' => 0.7],
            ['kode' => 'GJ35', 'nama' => 'Anemia (Pucat)', 'bobot' => 0.9],
            ['kode' => 'GJ36', 'nama' => 'Bengkak pada kelenjar limpa / getah bening', 'bobot' => 0.7],
            ['kode' => 'GJ37', 'nama' => 'Hidung bengkak dan luka', 'bobot' => 0.7],
            ['kode' => 'GJ38', 'nama' => 'Pengelupasan kulit sekitar wajah dan kepala', 'bobot' => 0.8],
            ['kode' => 'GJ39', 'nama' => 'Gangguan saraf mata (Buta mendadak)', 'bobot' => 0.8],
        ];

        DB::table('gejalas')->delete();
        DB::table('gejalas')->insert($gejalas);
    }
}
