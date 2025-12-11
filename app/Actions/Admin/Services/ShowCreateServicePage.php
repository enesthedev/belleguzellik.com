<?php

namespace App\Actions\Admin\Services;

use Inertia\Inertia;
use Inertia\Response;

class ShowCreateServicePage
{
    public function __invoke(): Response
    {
        return Inertia::render('admin/services/create');
    }
}
