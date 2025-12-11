<?php

namespace App\Actions\Admin\Services;

use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class ShowServices
{
    public function __invoke(): Response
    {
        $services = Service::query()
            ->orderByDesc('id')
            ->get()
            ->map(fn (Service $service) => [
                'id' => $service->id,
                'name' => $service->name,
                'description' => $service->description,
                'slug' => $service->slug,
                'content' => $service->content,
                'price' => $service->price,
                'duration' => $service->duration,
                'is_active' => $service->is_active,
                'image_url' => $service->image_url,
                'created_at' => $service->created_at->toDateTimeString(),
            ]);

        return Inertia::render('admin/services/index', [
            'services' => $services,
        ]);
    }
}
