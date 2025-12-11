<?php

namespace App\Actions;

use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class ShowService
{
    public function __invoke(Service $service): Response
    {
        $relatedServices = Service::query()
            ->where('id', '!=', $service->id)
            ->limit(3)
            ->get()
            ->map(fn (Service $s) => [
                'id' => $s->id,
                'slug' => $s->slug,
                'name' => $s->name,
                'description' => $s->description,
                'duration' => $s->duration,
                'image_url' => $s->image_url,
            ]);

        return Inertia::render('services/show', [
            'service' => [
                'id' => $service->id,
                'slug' => $service->slug,
                'name' => $service->name,
                'description' => $service->description,
                'content' => $service->content,
                'duration' => $service->duration,
                'image_url' => $service->image_url,
            ],
            'relatedServices' => $relatedServices,
            'seo' => [
                'title' => $service->name,
                'description' => $service->description ?: __('seo.service.description_template', ['name' => $service->name]),
                'image' => $service->image_url,
            ],
        ]);
    }
}
