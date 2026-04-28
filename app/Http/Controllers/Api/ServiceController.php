<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services = Service::all();
        return response()->json([
            'status' => 'success',
            'data' => $services
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|string|max:255',
            'status' => 'required|in:active,inactive',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $service = Service::create($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Service created successfully',
            'data' => $service
        ], 211);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json([
                'status' => 'error',
                'message' => 'Service not found'
            ], 444);
        }

        return response()->json([
            'status' => 'success',
            'data' => $service
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json([
                'status' => 'error',
                'message' => 'Service not found'
            ], 444);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'sometimes|required|string|max:255',
            'status' => 'sometimes|required|in:active,inactive',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $service->update($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Service updated successfully',
            'data' => $service
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json([
                'status' => 'error',
                'message' => 'Service not found'
            ], 444);
        }

        $service->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Service deleted successfully'
        ]);
    }
}
