<?php

namespace App\Services;

use App\Models\Project;
use Illuminate\Http\UploadedFile;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class MediaService
{
    public function uploadToProject(Project $project, UploadedFile $file, string $collection = 'screenshots'): Media
    {
        return $project
            ->addMedia($file)
            ->toMediaCollection($collection);
    }

    public function uploadThumbnail(Project $project, UploadedFile $file): Media
    {
        return $project
            ->addMedia($file)
            ->toMediaCollection('thumbnail');
    }

    public function delete(Media $media): void
    {
        $media->delete();
    }
}
