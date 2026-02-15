<?php

namespace App\Models;

use App\Enums\SectionType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectSection extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectSectionFactory> */
    use HasFactory;

    protected $fillable = [
        'project_id',
        'type',
        'title',
        'body',
        'sort_order',
        'is_visible',
    ];

    protected function casts(): array
    {
        return [
            'type' => SectionType::class,
            'is_visible' => 'boolean',
        ];
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
}
