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
            ['kode' => 'G01', 'nama' => 'Bersin-bersin berulang', 'bobot' => 0.8],
            ['kode' => 'G02', 'nama' => 'Hidung berair/pilek', 'bobot' => 0.75],
            ['kode' => 'G03', 'nama' => 'Demam tinggi (>39.5°C)', 'bobot' => 0.85],
            ['kode' => 'G04', 'nama' => 'Nafsu makan menurun', 'bobot' => 0.6],
            ['kode' => 'G05', 'nama' => 'Lesu dan lemah', 'bobot' => 0.65],
            ['kode' => 'G06', 'nama' => 'Perut membesar/asites', 'bobot' => 0.9],
            ['kode' => 'G07', 'nama' => 'Berat badan turun drastis', 'bobot' => 0.75],
            ['kode' => 'G08', 'nama' => 'Mata merah dan berair', 'bobot' => 0.8],
            ['kode' => 'G09', 'nama' => 'Kotoran mata berlebih', 'bobot' => 0.7],
            ['kode' => 'G10', 'nama' => 'Gatal parah, menggaruk terus', 'bobot' => 0.85],
            ['kode' => 'G11', 'nama' => 'Kerontokan rambut/bulu', 'bobot' => 0.75],
            ['kode' => 'G12', 'nama' => 'Luka/keropeng di kulit', 'bobot' => 0.8],
            ['kode' => 'G13', 'nama' => 'Bulu rontok membentuk lingkaran', 'bobot' => 0.85],
            ['kode' => 'G14', 'nama' => 'Muntah berulang', 'bobot' => 0.7],
            ['kode' => 'G15', 'nama' => 'Diare berdarah', 'bobot' => 0.9],
            ['kode' => 'G16', 'nama' => 'Dehidrasi parah', 'bobot' => 0.85],
            ['kode' => 'G17', 'nama' => 'Anemia/pucat', 'bobot' => 0.8],
            ['kode' => 'G18', 'nama' => 'Pembengkakan limfa', 'bobot' => 0.7],
            ['kode' => 'G19', 'nama' => 'Telinga gatal dan kotor', 'bobot' => 0.8],
            ['kode' => 'G20', 'nama' => 'Kepala miring/head tilt', 'bobot' => 0.75],
            ['kode' => 'G21', 'nama' => 'Bau telinga tidak sedap', 'bobot' => 0.65],
            ['kode' => 'G22', 'nama' => 'Minum air berlebihan (polidipsia)', 'bobot' => 0.85],
            ['kode' => 'G23', 'nama' => 'Sering buang air kecil', 'bobot' => 0.8],
            ['kode' => 'G24', 'nama' => 'Gula darah tinggi', 'bobot' => 0.9],
            ['kode' => 'G25', 'nama' => 'Kencing berdarah/berbau', 'bobot' => 0.75],
            ['kode' => 'G26', 'nama' => 'Muntah dan uremia', 'bobot' => 0.85],
            ['kode' => 'G27', 'nama' => 'Rambut kusam, berat badan turun', 'bobot' => 0.65],
            ['kode' => 'G28', 'nama' => 'Hiperaktif dan gelisah', 'bobot' => 0.75],
            ['kode' => 'G29', 'nama' => 'Jantung berdebar (takikardia)', 'bobot' => 0.8],
            ['kode' => 'G30', 'nama' => 'Bulu kurang terawat', 'bobot' => 0.5],
            ['kode' => 'G31', 'nama' => 'Kejang-kejang', 'bobot' => 0.9],
            ['kode' => 'G32', 'nama' => 'Kelumpuhan sebagian/total', 'bobot' => 0.85],
            ['kode' => 'G33', 'nama' => 'Diare cair', 'bobot' => 0.7],
            ['kode' => 'G34', 'nama' => 'Membran mukosa pucat', 'bobot' => 0.8],
            ['kode' => 'G35', 'nama' => 'Pembesaran limpa', 'bobot' => 0.75],
            ['kode' => 'G36', 'nama' => 'Sesak napas', 'bobot' => 0.85],
            ['kode' => 'G37', 'nama' => 'Batuk kronis', 'bobot' => 0.7],
            ['kode' => 'G38', 'nama' => 'Detak jantung tidak teratur', 'bobot' => 0.8],
            ['kode' => 'G39', 'nama' => 'Suhu tubuh sangat rendah', 'bobot' => 0.9],
        ];

        DB::table('gejalas')->insert($gejalas);
    }
}
