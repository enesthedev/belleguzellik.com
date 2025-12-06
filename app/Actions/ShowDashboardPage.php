<?php

namespace App\Actions;

use Inertia\Inertia;
use Inertia\Response;

class ShowDashboardPage
{
    public function __invoke(): Response
    {
        return Inertia::render('dashboard');
    }
}
