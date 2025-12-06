<?php

namespace App\Actions\Settings;

use Inertia\Inertia;
use Inertia\Response;

class ShowPasswordPage
{
    public function __invoke(): Response
    {
        return Inertia::render('settings/password');
    }
}
