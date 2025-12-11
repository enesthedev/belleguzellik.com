<?php

namespace App\Actions;

use App\Models\Comment;
use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Features;

class ShowWelcome
{
    public function __invoke(): Response
    {
        $comments = Comment::query()
            ->where('is_active', true)
            ->orderByDesc('id')
            ->get()
            ->map(fn (Comment $comment) => [
                'id' => $comment->id,
                'author' => $comment->author,
                'content' => $comment->content,
                'rating' => $comment->rating,
                'is_active' => $comment->is_active,
                'avatar_url' => $comment->avatar_url,
                'created_at' => $comment->created_at->toIso8601String(),
            ]);

        $services = Service::query()
            ->orderByDesc('id')
            ->limit(6)
            ->get()
            ->map(fn (Service $service) => [
                'id' => $service->id,
                'slug' => $service->slug,
                'name' => $service->name,
                'description' => $service->description,
                'duration' => $service->duration,
                'image_url' => $service->image_url,
            ]);

        return Inertia::render('welcome', [
            'canRegister' => Features::enabled(Features::registration()),
            'comments' => $comments,
            'services' => $services,
            'seo' => [
                'title' => __('seo.home.title'),
                'description' => __('seo.home.description'),
            ],
        ]);
    }
}
