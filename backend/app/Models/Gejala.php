<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gejala extends Model
{
    protected $fillable = [
        'kode',
        'nama',
        'bobot',
    ];

    public function penyakits()
    {
        return $this->belongsToMany(Penyakit::class, 'basis_pengetahuan', 'gejala_id', 'penyakit_id');
    }
}
