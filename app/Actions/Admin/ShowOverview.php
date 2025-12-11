<?php

namespace App\Actions\Admin;

use Inertia\Inertia;
use Inertia\Response;

class ShowOverview
{
    public function __invoke(): Response
    {
        return Inertia::render('admin/overview');
    }
}
