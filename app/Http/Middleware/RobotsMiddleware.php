<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Spatie\RobotsMiddleware\RobotsMiddleware as BaseRobotsMiddleware;

class RobotsMiddleware extends BaseRobotsMiddleware
{
    protected function shouldIndex(Request $request): string|bool
    {
        if ($request->routeIs(['admin.*', 'login', 'password.*', 'verification.*'])) {
            return false;
        }

        if ($request->is('yonetim*', '*/yonetim*', 'giris-yap*', '*/giris-yap*')) {
            return false;
        }

        return true;
    }
}
