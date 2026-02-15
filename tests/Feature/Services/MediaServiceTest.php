<?php

use App\Models\Project;
use App\Services\MediaService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    $this->service = app(MediaService::class);
    Storage::fake('public');
});

it('uploads a screenshot to a project', function () {
    $project = Project::factory()->create();
    $file = UploadedFile::fake()->image('screenshot.png', 800, 600);

    $media = $this->service->uploadToProject($project, $file);

    expect($media)->not->toBeNull();
    expect($media->collection_name)->toBe('screenshots');
    expect($project->getMedia('screenshots'))->toHaveCount(1);
});

it('uploads a thumbnail to a project replacing the previous one', function () {
    $project = Project::factory()->create();
    $file1 = UploadedFile::fake()->image('thumb1.jpg', 400, 300);
    $file2 = UploadedFile::fake()->image('thumb2.jpg', 400, 300);

    $this->service->uploadThumbnail($project, $file1);
    $this->service->uploadThumbnail($project, $file2);

    expect($project->refresh()->getMedia('thumbnail'))->toHaveCount(1);
});

it('deletes a media item', function () {
    $project = Project::factory()->create();
    $file = UploadedFile::fake()->image('screenshot.png');
    $media = $this->service->uploadToProject($project, $file);

    $this->service->delete($media);

    expect($project->refresh()->getMedia('screenshots'))->toHaveCount(0);
});

it('uploads multiple screenshots to a project', function () {
    $project = Project::factory()->create();

    $this->service->uploadToProject($project, UploadedFile::fake()->image('shot1.png'));
    $this->service->uploadToProject($project, UploadedFile::fake()->image('shot2.png'));
    $this->service->uploadToProject($project, UploadedFile::fake()->image('shot3.png'));

    expect($project->getMedia('screenshots'))->toHaveCount(3);
});
