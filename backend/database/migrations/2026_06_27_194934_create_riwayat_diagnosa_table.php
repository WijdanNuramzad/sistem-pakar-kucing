<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('riwayat_diagnosa', function (Blueprint $table) {
            $table->id();
            $table->string('nama_pemilik');
            $table->string('nama_kucing');
            $table->string('umur_kucing')->nullable();
            $table->string('jenis_kelamin');
            $table->unsignedBigInteger('penyakit_id')->nullable();
            $table->float('probabilitas');
            $table->json('gejala_dipilih');
            $table->json('hasil_lengkap');
            $table->timestamps();

            $table->foreign('penyakit_id')->references('id')->on('penyakits')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riwayat_diagnosa');
    }
};
