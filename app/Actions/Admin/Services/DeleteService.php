<?php

namespace App\Actions\Admin\Services;

use App\Models\Service;
use Illuminate\Http\RedirectResponse;

class DeleteService
{
    public function __invoke(Service $service): RedirectResponse
    {
        $service->delete();

        return redirect()->route('admin.services.index');
    }
}
