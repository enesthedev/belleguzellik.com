<?php

namespace App\Actions\Settings;

use Inertia\Inertia;
use Inertia\Response;

class ShowAppearancePage
{
    public function __invoke(): Response
    {
        return Inertia::render('settings/appearance');
    }
}
