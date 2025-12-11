<?php

namespace App\Actions\Admin\Services;

use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class ShowUpdateService
{
    public function __invoke(Service $service): Response
    {
        return Inertia::render('admin/services/update', [
            'service' => [
                'id' => $service->id,
                'name' => $service->name,
                'slug' => $service->slug,
                'description' => $service->description,
                'content' => $service->content,
                'duration' => $service->duration,
                'image_url' => $service->image_url,
            ],
        ]);
    }
}
