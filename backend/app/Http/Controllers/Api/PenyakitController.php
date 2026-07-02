<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Penyakit;
use Illuminate\Http\Request;

class PenyakitController extends Controller
{
    public function index()
    {
        $penyakits = Penyakit::all();
        return response()->json($penyakits);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kode' => 'required|string|unique:penyakits',
            'nama' => 'required|string',
            'deskripsi' => 'required|string',
            'solusi' => 'required|string',
        ]);

        $penyakit = Penyakit::create($validated);
        return response()->json($penyakit, 201);
    }

    public function update(Request $request, $id)
    {
        $penyakit = Penyakit::findOrFail($id);
        
        $validated = $request->validate([
            'kode' => 'required|string|unique:penyakits,kode,' . $penyakit->id,
            'nama' => 'required|string',
            'deskripsi' => 'required|string',
            'solusi' => 'required|string',
        ]);

        $penyakit->update($validated);
        return response()->json($penyakit);
    }

    public function destroy($id)
    {
        $penyakit = Penyakit::findOrFail($id);
        $penyakit->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
