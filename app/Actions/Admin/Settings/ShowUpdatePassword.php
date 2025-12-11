<?php

namespace App\Actions\Admin\Settings;

use Inertia\Inertia;
use Inertia\Response;

class ShowUpdatePassword
{
    public function __invoke(): Response
    {
        return Inertia::render('admin/settings/password');
    }
}
