<?php

namespace App\Actions\Admin\Services;

use App\Models\Service;
use App\Models\TemporaryUpload;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class CreateService
{
    public function __invoke(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'content' => ['nullable', 'string'],
            'duration' => ['required', 'integer', 'min:1'],
            'image' => ['nullable', 'image', 'max:2048'],
            'session_key' => ['nullable', 'uuid'],
        ]);

        $service = Service::create([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'content' => $validated['content'] ?? null,
            'duration' => $validated['duration'],
        ]);

        if ($request->hasFile('image')) {
            $service->addMediaFromRequest('image')
                ->toMediaCollection('image');
        }

        $this->transferContentImages($service, $validated['session_key'] ?? null, $validated['content'] ?? '');

        return redirect()->route('admin.services.index');
    }

    private function transferContentImages(Service $service, ?string $sessionKey, string $content): void
    {
        if (! $sessionKey) {
            return;
        }

        $temporaryUpload = TemporaryUpload::where('session_key', $sessionKey)->first();

        if (! $temporaryUpload) {
            return;
        }

        $usedUrls = $this->extractImageUrlsFromContent($content);
        $updatedContent = $content;

        foreach ($temporaryUpload->getMedia('content_images') as $media) {
            $oldUrl = $media->getUrl();

            if (in_array($oldUrl, $usedUrls, true)) {
                $movedMedia = $media->move($service, 'content_images');
                $newUrl = $movedMedia->getUrl();
                $updatedContent = str_replace($oldUrl, $newUrl, $updatedContent);
            } else {
                $media->delete();
            }
        }

        if ($updatedContent !== $content) {
            $service->update(['content' => $updatedContent]);
        }

        $temporaryUpload->delete();
    }

    /**
     * @return array<string>
     */
    private function extractImageUrlsFromContent(string $content): array
    {
        preg_match_all('/<img[^>]+src=["\']([^"\']+)["\'][^>]*>/i', $content, $matches);

        return $matches[1] ?? [];
    }
}
