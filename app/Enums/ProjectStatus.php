<?php

namespace App\Enums;

enum ProjectStatus: string
{
    case Production = 'production';
    case Beta = 'beta';
    case PublicBeta = 'public_beta';
    case InDevelopment = 'in_development';
    case Research = 'research';
    case Deferred = 'deferred';

    public function label(): string
    {
        return match ($this) {
            self::Production => 'Production',
            self::Beta => 'Beta',
            self::PublicBeta => 'Public Beta',
            self::InDevelopment => 'In Development',
            self::Research => 'Research',
            self::Deferred => 'Deferred',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::Production => 'green',
            self::Beta => 'blue',
            self::PublicBeta => 'cyan',
            self::InDevelopment => 'yellow',
            self::Research => 'purple',
            self::Deferred => 'gray',
        };
    }
}
