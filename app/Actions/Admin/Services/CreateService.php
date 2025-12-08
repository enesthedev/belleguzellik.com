<?php

namespace App\Actions\Admin\Services;

use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class CreateService
{
    public function __invoke(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'duration' => ['required', 'integer', 'min:1'],
            'image' => ['nullable', 'image', 'max:2048'],
        ]);

        $service = Service::create([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'price' => $validated['price'],
            'duration' => $validated['duration'],
        ]);

        if ($request->hasFile('image')) {
            $service->addMediaFromRequest('image')
                ->toMediaCollection('image');
        }

        return redirect()->route('admin.services.index');
    }
}
