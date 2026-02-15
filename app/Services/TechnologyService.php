<?php

namespace App\Services;

use App\Models\Technology;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class TechnologyService
{
    public function getAll(): Collection
    {
        return Technology::query()
            ->withCount('projects')
            ->orderBy('name')
            ->get();
    }

    public function create(array $data): Technology
    {
        $data['slug'] = Str::slug($data['name']);

        return Technology::query()->create($data);
    }

    public function update(Technology $technology, array $data): Technology
    {
        if (isset($data['name']) && $data['name'] !== $technology->name) {
            $data['slug'] = Str::slug($data['name']);
        }

        $technology->update($data);

        return $technology->refresh();
    }

    public function delete(Technology $technology): void
    {
        $technology->projects()->detach();
        $technology->delete();
    }
}
