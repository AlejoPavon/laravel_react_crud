<?php

namespace App\Http\Controllers;

use App\Models\Developer;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class DeveloperController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $developers = $request->user()
                ->developers()
                ->latest()
                ->get();

            // Asegurar que siempre devolvemos un array, incluso si está vacío
            return response()->json($developers->isEmpty() ? [] : $developers);
            
        } catch (\Exception $e) {
            return response()->json([], 200); // Devolver array vacío en caso de error
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'main_stack' => 'required|string|max:255',
                'seniority' => 'required|in:JR,SSR,SR',
                'hourly_rate' => 'required|numeric|min:0',
            ]);

            $developer = $request->user()->developers()->create([
                'name' => $request->name,
                'main_stack' => $request->main_stack,
                'seniority' => $request->seniority,
                'hourly_rate' => $request->hourly_rate,
                'is_active' => true,
            ]);

            return response()->json($developer, 201);
            
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }
    }

    public function show(Request $request, $id): JsonResponse
    {
        try {
            $developer = Developer::where('user_id', $request->user()->id)
                ->where('id', $id)
                ->firstOrFail();

            return response()->json($developer);
            
        } catch (\Exception $e) {
            return response()->json(['error' => 'Developer not found'], 404);
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        try {
            $developer = Developer::where('user_id', $request->user()->id)
                ->where('id', $id)
                ->firstOrFail();

            $request->validate([
                'name' => 'sometimes|string|max:255',
                'main_stack' => 'sometimes|string|max:255',
                'seniority' => 'sometimes|in:JR,SSR,SR',
                'hourly_rate' => 'sometimes|numeric|min:0',
                'is_active' => 'sometimes|boolean'
            ]);

            $developer->update($request->all());

            return response()->json($developer);
            
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 404);
        }
    }

    public function destroy(Request $request, $id): JsonResponse
    {
        try {
            $developer = Developer::where('user_id', $request->user()->id)
                ->where('id', $id)
                ->firstOrFail();

            $developer->delete();

            return response()->json(['message' => 'Developer deleted successfully']);
            
        } catch (\Exception $e) {
            return response()->json(['error' => 'Developer not found'], 404);
        }
    }
}