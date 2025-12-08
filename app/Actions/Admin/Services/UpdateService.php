<?php

namespace App\Actions\Admin\Services;

use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class UpdateService
{
    public function __invoke(Request $request, Service $service): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'duration' => ['required', 'integer', 'min:1'],
            'is_active' => ['boolean'],
            'image' => ['nullable', 'image', 'max:2048'],
        ]);

        $service->update([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'price' => $validated['price'],
            'duration' => $validated['duration'],
            'is_active' => $validated['is_active'] ?? $service->is_active,
        ]);

        if ($request->hasFile('image')) {
            $service->addMediaFromRequest('image')
                ->toMediaCollection('image');
        }

        return redirect()->route('admin.services.index');
    }
}
