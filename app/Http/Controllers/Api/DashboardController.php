<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Get dashboard summary stats and latest services for the authenticated user.
     */
    public function summary(Request $request)
    {
        $userServices = $request->user()->services();

        $totalServices = (clone $userServices)->count();
        $activeServices = (clone $userServices)->where('status', 'active')->count();
        $inactiveServices = (clone $userServices)->where('status', 'inactive')->count();
        $latestServices = (clone $userServices)->latest()->take(5)->get();

        return response()->json([
            'status' => 'success',
            'data' => [
                'stats' => [
                    'total' => $totalServices,
                    'active' => $activeServices,
                    'inactive' => $inactiveServices,
                ],
                'latest_services' => $latestServices
            ]
        ]);
    }
}
