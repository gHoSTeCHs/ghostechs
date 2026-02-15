<?php

use App\Models\Page;
use App\Services\PageService;

beforeEach(function () {
    $this->service = app(PageService::class);
});

it('retrieves a page by slug', function () {
    $page = Page::factory()->create(['slug' => 'about']);

    $found = $this->service->getBySlug('about');

    expect($found->id)->toBe($page->id);
});

it('throws not found for missing slug', function () {
    $this->service->getBySlug('nonexistent');
})->throws(Illuminate\Database\Eloquent\ModelNotFoundException::class);

it('updates a page', function () {
    $page = Page::factory()->create(['title' => 'Old Title']);

    $updated = $this->service->update($page, [
        'title' => 'New Title',
        'body' => 'Updated body content',
    ]);

    expect($updated->title)->toBe('New Title');
    expect($updated->body)->toBe('Updated body content');
});
