<?php

namespace App\Actions\Admin\Services;

use App\Models\Service;
use App\Models\TemporaryUpload;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class UpdateService
{
    public function __invoke(Request $request, Service $service): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'content' => ['nullable', 'string'],
            'duration' => ['required', 'integer', 'min:1'],
            'image' => ['nullable', 'image', 'max:2048'],
            'session_key' => ['nullable', 'uuid'],
        ]);

        $service->update([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'content' => $validated['content'] ?? null,
            'duration' => $validated['duration'],
        ]);

        if ($request->hasFile('image')) {
            $service->addMediaFromRequest('image')
                ->toMediaCollection('image');
        }

        $this->syncContentImages($service, $validated['session_key'] ?? null, $validated['content'] ?? '');

        return redirect()->route('admin.services.index');
    }

    private function syncContentImages(Service $service, ?string $sessionKey, string $content): void
    {
        $updatedContent = $content;

        if ($sessionKey) {
            $temporaryUpload = TemporaryUpload::where('session_key', $sessionKey)->first();

            if ($temporaryUpload) {
                $usedUrls = $this->extractImageUrlsFromContent($content);

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

                $temporaryUpload->delete();
            }
        }

        if ($updatedContent !== $content) {
            $service->update(['content' => $updatedContent]);
        }

        $usedUrls = $this->extractImageUrlsFromContent($updatedContent);

        foreach ($service->getMedia('content_images') as $media) {
            if (! in_array($media->getUrl(), $usedUrls, true)) {
                $media->delete();
            }
        }
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
