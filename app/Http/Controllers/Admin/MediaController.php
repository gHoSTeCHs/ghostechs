<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Services\MediaService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class MediaController extends Controller
{
    public function __construct(
        private MediaService $mediaService,
    ) {}

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'file' => ['required', 'file', 'max:10240'],
            'model_type' => ['required', 'string', 'in:project'],
            'model_id' => ['required', 'integer'],
            'collection' => ['required', 'string', 'in:thumbnail,screenshots'],
        ]);

        $project = Project::query()->findOrFail($request->input('model_id'));

        if ($request->input('collection') === 'thumbnail') {
            $this->mediaService->uploadThumbnail($project, $request->file('file'));
        } else {
            $this->mediaService->uploadToProject($project, $request->file('file'));
        }

        return back()->with('success', 'Media uploaded.');
    }

    public function destroy(Media $media): RedirectResponse
    {
        $this->mediaService->delete($media);

        return back()->with('success', 'Media deleted.');
    }
}
