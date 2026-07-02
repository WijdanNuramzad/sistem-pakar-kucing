<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Penyakit extends Model
{
    protected $fillable = [
        'kode',
        'nama',
        'deskripsi',
        'solusi',
    ];

    public function gejalas()
    {
        return $this->belongsToMany(Gejala::class, 'basis_pengetahuan', 'penyakit_id', 'gejala_id');
    }

    public function basisPengetahuan()
    {
        return $this->hasMany(BasisPengetahuan::class);
    }
}
