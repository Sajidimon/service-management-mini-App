<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->user()->services();

        if ($request->filled('search')) {
            $query->where(function($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $services = $query->latest()->get();

        if ($request->wantsJson()) {
            return response()->json($services);
        }

        return Inertia::render('ServiceDashboard', [
            'services' => $services,
            'filters' => $request->only(['search', 'status'])
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|string',
            'status' => 'required|in:active,inactive',
        ]);

        $service = Service::create($validated);

        if ($request->wantsJson()) {
            return response()->json($service, 201);
        }

        return redirect()->back();
    }

    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|string',
            'status' => 'required|in:active,inactive',
        ]);

        $service->update($validated);

        if ($request->wantsJson()) {
            return response()->json($service);
        }

        return redirect()->back();
    }

    public function destroy(Request $request, Service $service)
    {
        $service->delete();

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Service deleted']);
        }

        return redirect()->back();
    }

    public function toggleStatus(Request $request, Service $service)
    {
        $service->status = $service->status === 'active' ? 'inactive' : 'active';
        $service->save();

        return response()->json($service);
    }
}
