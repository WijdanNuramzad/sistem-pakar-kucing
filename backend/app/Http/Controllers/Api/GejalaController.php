<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Gejala;
use Illuminate\Http\Request;

class GejalaController extends Controller
{
    public function index()
    {
        $gejalas = Gejala::all();
        return response()->json($gejalas);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kode' => 'required|string|unique:gejalas',
            'nama' => 'required|string',
            'bobot' => 'required|numeric',
        ]);

        $gejala = Gejala::create($validated);
        return response()->json($gejala, 201);
    }

    public function update(Request $request, $id)
    {
        $gejala = Gejala::findOrFail($id);

        $validated = $request->validate([
            'kode' => 'required|string|unique:gejalas,kode,' . $gejala->id,
            'nama' => 'required|string',
            'bobot' => 'required|numeric',
        ]);

        $gejala->update($validated);
        return response()->json($gejala);
    }

    public function destroy($id)
    {
        $gejala = Gejala::findOrFail($id);
        $gejala->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
