<?php

namespace App\Actions;

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
                'slug' => $service->slug,
                'name' => $service->name,
                'description' => $service->description,
                'duration' => $service->duration,
                'image_url' => $service->image_url,
            ]);

        return Inertia::render('services/index', [
            'services' => $services,
            'seo' => [
                'title' => __('seo.services.title'),
                'description' => __('seo.services.description'),
            ],
        ]);
    }
}
