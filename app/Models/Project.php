<?php

namespace App\Models;

use App\Enums\ProjectStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Project extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\ProjectFactory> */
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'slug',
        'title',
        'tagline',
        'description',
        'status',
        'is_featured',
        'is_visible',
        'sort_order',
        'external_url',
        'github_url',
        'meta_title',
        'meta_description',
        'published_at',
    ];

    protected function casts(): array
    {
        return [
            'status' => ProjectStatus::class,
            'is_featured' => 'boolean',
            'is_visible' => 'boolean',
            'published_at' => 'datetime',
        ];
    }

    public function sections(): HasMany
    {
        return $this->hasMany(ProjectSection::class)->orderBy('sort_order');
    }

    public function visibleSections(): HasMany
    {
        return $this->hasMany(ProjectSection::class)
            ->where('is_visible', true)
            ->orderBy('sort_order');
    }

    public function technologies(): BelongsToMany
    {
        return $this->belongsToMany(Technology::class);
    }

    public function scopeVisible(Builder $query): Builder
    {
        return $query->where('is_visible', true);
    }

    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('is_featured', true);
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort_order');
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('thumbnail')->singleFile();
        $this->addMediaCollection('screenshots');
    }
}
