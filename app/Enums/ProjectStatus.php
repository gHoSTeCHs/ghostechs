<?php

namespace App\Enums;

enum ProjectStatus: string
{
    case Production = 'production';
    case InDevelopment = 'in_development';
    case Released = 'released';
    case Research = 'research';
    case Archived = 'archived';

    public function label(): string
    {
        return match ($this) {
            self::Production => 'Production',
            self::InDevelopment => 'In Development',
            self::Released => 'Released',
            self::Research => 'Research',
            self::Archived => 'Archived',
        };
    }
}
