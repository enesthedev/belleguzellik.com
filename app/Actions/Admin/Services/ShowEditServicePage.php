<?php

namespace App\Actions\Admin\Services;

use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class ShowEditServicePage
{
    public function __invoke(Service $service): Response
    {
        return Inertia::render('admin/services/edit', [
            'service' => [
                'id' => $service->id,
                'name' => $service->name,
                'slug' => $service->slug,
                'description' => $service->description,
                'content' => $service->content,
                'price' => $service->price,
                'duration' => $service->duration,
                'is_active' => $service->is_active,
                'image_url' => $service->image_url,
            ],
        ]);
    }
}
