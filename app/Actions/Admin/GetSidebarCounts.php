<?php

namespace App\Actions\Admin;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Service;
use Illuminate\Http\JsonResponse;

class GetSidebarCounts extends Controller
{
    public function __invoke(): JsonResponse
    {
        return response()->json([
            'comments' => Comment::count(),
            'services' => Service::count(),
        ]);
    }
}
