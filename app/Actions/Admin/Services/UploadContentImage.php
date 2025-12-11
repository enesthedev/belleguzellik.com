<?php

namespace App\Actions\Admin\Services;

use App\Models\TemporaryUpload;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UploadContentImage
{
    public function __invoke(Request $request): JsonResponse
    {
        $request->validate([
            'session_key' => ['required', 'uuid'],
            'image' => ['required', 'image', 'max:5120'],
        ]);

        $temporaryUpload = TemporaryUpload::firstOrCreate([
            'session_key' => $request->input('session_key'),
        ]);

        $media = $temporaryUpload
            ->addMediaFromRequest('image')
            ->toMediaCollection('content_images');

        return response()->json([
            'url' => $media->getUrl(),
        ]);
    }
}
