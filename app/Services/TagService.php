<?php

namespace App\Services;

use App\Models\Tag;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class TagService
{
    public function getAll(): Collection
    {
        return Tag::query()
            ->withCount('posts')
            ->orderBy('name')
            ->get();
    }

    public function create(array $data): Tag
    {
        $data['slug'] = Str::slug($data['name']);

        return Tag::query()->create($data);
    }

    public function delete(Tag $tag): void
    {
        $tag->posts()->detach();
        $tag->delete();
    }
}
