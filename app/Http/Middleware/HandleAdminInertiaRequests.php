<?php

namespace App\Http\Middleware;

use App\Models\Comment;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleAdminInertiaRequests extends Middleware
{
    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'sidebar_state' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'counts' => [
                'comments' => Comment::count(),
                'services' => Service::count(),
            ],
        ];
    }
}
