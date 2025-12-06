<?php

namespace App\Actions;

use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Features;

class ShowWelcomePage
{
    public function __invoke(): Response
    {
        return Inertia::render('welcome', [
            'canRegister' => Features::enabled(Features::registration()),
        ]);
    }
}
