<?php

namespace App\Actions;

use App\Models\Comment;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Features;

class ShowWelcomePage
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

        return Inertia::render('welcome', [
            'canRegister' => Features::enabled(Features::registration()),
            'comments' => $comments,
        ]);
    }
}
