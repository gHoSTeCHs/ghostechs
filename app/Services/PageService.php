<?php

namespace App\Services;

use App\Models\Page;

class PageService
{
    public function getBySlug(string $slug): Page
    {
        return Page::query()
            ->where('slug', $slug)
            ->firstOrFail();
    }

    public function update(Page $page, array $data): Page
    {
        $page->update($data);

        return $page->refresh();
    }
}
