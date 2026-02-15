<?php

namespace App\Services;

use App\Models\Post;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class PostService
{
    public function __construct(
        private MarkdownService $markdownService,
    ) {}

    public function getPublished(?string $tagSlug = null): Collection
    {
        $query = Post::query()
            ->published()
            ->recent()
            ->with('tags');

        if ($tagSlug) {
            $query->whereHas('tags', function ($q) use ($tagSlug) {
                $q->where('slug', $tagSlug);
            });
        }

        return $query->get();
    }

    public function getFeaturedPublished(int $limit = 3): Collection
    {
        return Post::query()
            ->published()
            ->featured()
            ->recent()
            ->limit($limit)
            ->get();
    }

    public function getBySlug(string $slug): Post
    {
        return Post::query()
            ->published()
            ->where('slug', $slug)
            ->with('tags')
            ->firstOrFail();
    }

    public function getRelatedPosts(Post $post, int $limit = 3): Collection
    {
        $tagIds = $post->tags()->pluck('tags.id');

        return Post::query()
            ->published()
            ->where('id', '!=', $post->id)
            ->whereHas('tags', function ($q) use ($tagIds) {
                $q->whereIn('tags.id', $tagIds);
            })
            ->recent()
            ->limit($limit)
            ->get();
    }

    public function getAllForAdmin(): Collection
    {
        return Post::query()
            ->latest('updated_at')
            ->with('tags')
            ->get();
    }

    public function create(array $data): Post
    {
        $tagIds = $data['tag_ids'] ?? [];
        unset($data['tag_ids']);

        $data['slug'] = Str::slug($data['title']);
        $data['reading_time_minutes'] = $this->markdownService->estimateReadingTime($data['body'] ?? '');

        $post = Post::query()->create($data);

        if ($tagIds) {
            $post->tags()->sync($tagIds);
        }

        return $post->load('tags');
    }

    public function update(Post $post, array $data): Post
    {
        $tagIds = $data['tag_ids'] ?? null;
        unset($data['tag_ids']);

        if (isset($data['body']) && $data['body'] !== $post->body) {
            $data['reading_time_minutes'] = $this->markdownService->estimateReadingTime($data['body']);
        }

        $post->update($data);

        if ($tagIds !== null) {
            $post->tags()->sync($tagIds);
        }

        return $post->refresh()->load('tags');
    }

    public function delete(Post $post): void
    {
        $post->tags()->detach();
        $post->delete();
    }
}
