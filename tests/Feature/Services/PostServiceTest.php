<?php

use App\Enums\PostStatus;
use App\Models\Post;
use App\Models\Tag;
use App\Services\PostService;

beforeEach(function () {
    $this->service = app(PostService::class);
});

it('returns published posts in recent order', function () {
    Post::factory()->published()->create(['title' => 'Older', 'published_at' => now()->subDays(2)]);
    Post::factory()->published()->create(['title' => 'Newer', 'published_at' => now()->subDay()]);
    Post::factory()->draft()->create(['title' => 'Draft']);

    $posts = $this->service->getPublished();

    expect($posts)->toHaveCount(2);
    expect($posts->first()->title)->toBe('Newer');
});

it('filters published posts by tag slug', function () {
    $tag = Tag::factory()->create(['slug' => 'laravel']);
    $tagged = Post::factory()->published()->create();
    $tagged->tags()->attach($tag);
    Post::factory()->published()->create();

    $posts = $this->service->getPublished('laravel');

    expect($posts)->toHaveCount(1);
    expect($posts->first()->id)->toBe($tagged->id);
});

it('returns featured published posts with limit', function () {
    Post::factory()->published()->create(['is_featured' => true]);
    Post::factory()->published()->create(['is_featured' => true]);
    Post::factory()->published()->create(['is_featured' => false]);

    $featured = $this->service->getFeaturedPublished(2);

    expect($featured)->toHaveCount(2);
});

it('retrieves a published post by slug', function () {
    $post = Post::factory()->published()->create(['slug' => 'my-post']);

    $found = $this->service->getBySlug('my-post');

    expect($found->id)->toBe($post->id);
    expect($found->relationLoaded('tags'))->toBeTrue();
});

it('throws not found for draft post slug', function () {
    Post::factory()->draft()->create(['slug' => 'draft-post']);

    $this->service->getBySlug('draft-post');
})->throws(Illuminate\Database\Eloquent\ModelNotFoundException::class);

it('returns related posts that share tags', function () {
    $tag = Tag::factory()->create();
    $post = Post::factory()->published()->create();
    $post->tags()->attach($tag);

    $related = Post::factory()->published()->create();
    $related->tags()->attach($tag);

    Post::factory()->published()->create();

    $result = $this->service->getRelatedPosts($post);

    expect($result)->toHaveCount(1);
    expect($result->first()->id)->toBe($related->id);
});

it('returns all posts for admin including drafts', function () {
    Post::factory()->published()->create();
    Post::factory()->draft()->create();
    Post::factory()->archived()->create();

    $posts = $this->service->getAllForAdmin();

    expect($posts)->toHaveCount(3);
});

it('creates a post with auto-slug and reading time', function () {
    $tag = Tag::factory()->create();

    $post = $this->service->create([
        'title' => 'My First Post',
        'body' => str_repeat('word ', 400),
        'status' => PostStatus::Draft,
        'tag_ids' => [$tag->id],
    ]);

    expect($post->slug)->toBe('my-first-post');
    expect($post->reading_time_minutes)->toBe(2);
    expect($post->tags)->toHaveCount(1);
});

it('updates a post and recalculates reading time when body changes', function () {
    $post = Post::factory()->published()->create([
        'body' => str_repeat('word ', 100),
        'reading_time_minutes' => 1,
    ]);

    $updated = $this->service->update($post, [
        'body' => str_repeat('word ', 600),
    ]);

    expect($updated->reading_time_minutes)->toBe(3);
});

it('does not recalculate reading time when body is unchanged', function () {
    $body = str_repeat('word ', 100);
    $post = Post::factory()->published()->create([
        'body' => $body,
        'reading_time_minutes' => 1,
    ]);

    $updated = $this->service->update($post, ['title' => 'New Title']);

    expect($updated->reading_time_minutes)->toBe(1);
});

it('deletes a post and detaches tags', function () {
    $post = Post::factory()->published()->create();
    $tag = Tag::factory()->create();
    $post->tags()->attach($tag);

    $this->service->delete($post);

    expect(Post::query()->find($post->id))->toBeNull();
    expect($tag->posts()->count())->toBe(0);
});
