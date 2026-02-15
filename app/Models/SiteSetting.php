<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    /** @use HasFactory<\Database\Factories\SiteSettingFactory> */
    use HasFactory;

    protected $fillable = [
        'key',
        'value',
    ];

    public static function getByKey(string $key, mixed $default = null): mixed
    {
        $setting = static::query()->where('key', $key)->first();

        return $setting?->value ?? $default;
    }

    /** @return array<string, string|null> */
    public static function getAllAsArray(): array
    {
        return static::query()
            ->pluck('value', 'key')
            ->toArray();
    }
}
