<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BasisPengetahuan;
use App\Models\Penyakit;
use App\Models\Gejala;
use Illuminate\Http\Request;

class BasisPengetahuanController extends Controller
{
    /**
     * GET /api/basis-pengetahuan
     * Mengembalikan daftar semua penyakit beserta gejala-gejalanya.
     * Setiap penyakit yang sudah punya gejala terdaftar akan muncul sebagai 1 rule.
     */
    public function index()
    {
        $penyakits = Penyakit::with('gejalas')->get();

        $rules = $penyakits
            ->filter(fn($p) => $p->gejalas->isNotEmpty())
            ->values()
            ->map(fn($p, $i) => [
                'kode'     => 'R' . str_pad($i + 1, 2, '0', STR_PAD_LEFT),
                'penyakit' => $p->only(['id', 'kode', 'nama', 'deskripsi', 'solusi']),
                'gejala'   => $p->gejalas->map(fn($g) => $g->only(['id', 'kode', 'nama', 'bobot'])),
            ]);

        return response()->json($rules);
    }

    /**
     * POST /api/basis-pengetahuan
     * Simpan relasi gejala untuk 1 penyakit.
     * Body: { penyakit_id: int, gejala_ids: int[] }
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'penyakit_id' => 'required|exists:penyakits,id',
            'gejala_ids'  => 'required|array|min:1',
            'gejala_ids.*' => 'exists:gejalas,id',
        ]);

        $penyakit = Penyakit::findOrFail($validated['penyakit_id']);

        // Sync mengganti semua relasi lama dengan yang baru
        $penyakit->gejalas()->sync($validated['gejala_ids']);

        $penyakit->load('gejalas');

        return response()->json([
            'message' => 'Basis pengetahuan berhasil disimpan',
            'penyakit' => $penyakit->only(['id', 'kode', 'nama', 'deskripsi', 'solusi']),
            'gejala'   => $penyakit->gejalas->map(fn($g) => $g->only(['id', 'kode', 'nama', 'bobot'])),
        ], 201);
    }

    /**
     * PUT /api/basis-pengetahuan/{penyakit_id}
     * Update gejala untuk 1 penyakit (berdasarkan penyakit_id).
     * Body: { gejala_ids: int[] }
     */
    public function update(Request $request, $penyakit_id)
    {
        $validated = $request->validate([
            'gejala_ids'   => 'required|array|min:1',
            'gejala_ids.*' => 'exists:gejalas,id',
        ]);

        $penyakit = Penyakit::findOrFail($penyakit_id);
        $penyakit->gejalas()->sync($validated['gejala_ids']);
        $penyakit->load('gejalas');

        return response()->json([
            'message' => 'Basis pengetahuan berhasil diupdate',
            'penyakit' => $penyakit->only(['id', 'kode', 'nama', 'deskripsi', 'solusi']),
            'gejala'   => $penyakit->gejalas->map(fn($g) => $g->only(['id', 'kode', 'nama', 'bobot'])),
        ]);
    }

    /**
     * DELETE /api/basis-pengetahuan/{penyakit_id}
     * Hapus semua relasi gejala untuk 1 penyakit.
     */
    public function destroy($penyakit_id)
    {
        $penyakit = Penyakit::findOrFail($penyakit_id);
        $penyakit->gejalas()->detach();

        return response()->json(['message' => 'Basis pengetahuan berhasil dihapus']);
    }

    /**
     * GET /api/basis-pengetahuan/all-penyakit
     * Helper: mengembalikan semua penyakit (untuk dropdown di form).
     */
    public function allPenyakit()
    {
        return response()->json(Penyakit::select('id', 'kode', 'nama')->get());
    }

    /**
     * GET /api/basis-pengetahuan/all-gejala
     * Helper: mengembalikan semua gejala (untuk multi-select di form).
     */
    public function allGejala()
    {
        return response()->json(Gejala::select('id', 'kode', 'nama', 'bobot')->get());
    }
}
