<?php

namespace App\Actions\Admin\Comments;

use App\Models\Comment;
use Inertia\Inertia;
use Inertia\Response;

class ShowComments
{
    public function __invoke(): Response
    {
        $comments = Comment::query()
            ->orderByDesc('id')
            ->get()
            ->map(fn (Comment $comment) => [
                'id' => $comment->id,
                'author' => $comment->author,
                'content' => $comment->content,
                'rating' => $comment->rating,
                'is_active' => $comment->is_active,
                'avatar_url' => $comment->avatar_url,
                'created_at' => $comment->created_at->toDateTimeString(),
            ]);

        return Inertia::render('admin/comments/index', [
            'comments' => $comments,
        ]);
    }
}
