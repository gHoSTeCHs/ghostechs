<?php

use App\Models\Post;
use App\Models\Tag;
use App\Services\TagService;

beforeEach(function () {
    $this->service = app(TagService::class);
});

it('returns all tags ordered by name with post count', function () {
    Tag::factory()->create(['name' => 'Zeta']);
    Tag::factory()->create(['name' => 'Alpha']);

    $tags = $this->service->getAll();

    expect($tags->first()->name)->toBe('Alpha');
    expect($tags->last()->name)->toBe('Zeta');
    expect($tags->first())->toHaveKey('posts_count');
});

it('creates a tag with auto-generated slug', function () {
    $tag = $this->service->create(['name' => 'Machine Learning']);

    expect($tag->name)->toBe('Machine Learning');
    expect($tag->slug)->toBe('machine-learning');
});

it('deletes a tag and detaches posts', function () {
    $tag = Tag::factory()->create();
    $post = Post::factory()->published()->create();
    $tag->posts()->attach($post);

    $this->service->delete($tag);

    expect(Tag::query()->find($tag->id))->toBeNull();
    expect($post->tags()->count())->toBe(0);
});
