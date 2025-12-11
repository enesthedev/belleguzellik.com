<?php

namespace App\Actions;

use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ShowService
{
    public function __invoke(Service $service): Response
    {
        if (! $service->is_active) {
            throw new NotFoundHttpException;
        }

        $relatedServices = Service::query()
            ->where('is_active', true)
            ->where('id', '!=', $service->id)
            ->limit(3)
            ->get()
            ->map(fn (Service $s) => [
                'id' => $s->id,
                'slug' => $s->slug,
                'name' => $s->name,
                'description' => $s->description,
                'price' => $s->price,
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
                'price' => $service->price,
                'duration' => $service->duration,
                'image_url' => $service->image_url,
            ],
            'relatedServices' => $relatedServices,
        ]);
    }
}
