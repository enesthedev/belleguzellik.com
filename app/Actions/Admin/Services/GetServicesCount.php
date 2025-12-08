<?php

namespace App\Actions\Admin\Services;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\JsonResponse;

class GetServicesCount extends Controller
{
    public function __invoke(): JsonResponse
    {
        return response()->json([
            'count' => Service::count(),
        ]);
    }
}
