<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RiwayatDiagnosa extends Model
{
    protected $table = 'riwayat_diagnosa';

    protected $fillable = [
        'nama_pemilik',
        'nama_kucing',
        'umur_kucing',
        'jenis_kelamin',
        'penyakit_id',
        'probabilitas',
        'gejala_dipilih',
        'hasil_lengkap',
    ];

    protected $casts = [
        'gejala_dipilih' => 'array',
        'hasil_lengkap' => 'array',
    ];

    public function penyakit()
    {
        return $this->belongsTo(Penyakit::class);
    }
}
