<?php

namespace App\Actions\Settings;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ShowProfilePage
{
    public function __invoke(Request $request): Response
    {
        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => false,
            'status' => $request->session()->get('status'),
        ]);
    }
}
