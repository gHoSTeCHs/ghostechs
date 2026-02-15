<?php

namespace App\Services;

use App\Models\SiteSetting;

class SiteSettingService
{
    /** @return array<string, string|null> */
    public function getAll(): array
    {
        return SiteSetting::getAllAsArray();
    }

    public function get(string $key, mixed $default = null): mixed
    {
        return SiteSetting::getByKey($key, $default);
    }

    /** @return array<string, string|null> */
    public function getPublicSettings(): array
    {
        return $this->getAll();
    }

    public function update(array $data): void
    {
        foreach ($data as $key => $value) {
            SiteSetting::query()->updateOrCreate(
                ['key' => $key],
                ['value' => $value],
            );
        }
    }
}
