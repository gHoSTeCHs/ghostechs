<?php

namespace App\Enums;

enum SectionType: string
{
    case Overview = 'overview';
    case Mission = 'mission';
    case Problem = 'problem';
    case Solution = 'solution';
    case Architecture = 'architecture';
    case Lessons = 'lessons';
    case Roadmap = 'roadmap';
    case Custom = 'custom';

    public function label(): string
    {
        return match ($this) {
            self::Overview => 'Overview',
            self::Mission => 'Mission',
            self::Problem => 'Problem',
            self::Solution => 'Solution',
            self::Architecture => 'Architecture',
            self::Lessons => 'Lessons',
            self::Roadmap => 'Roadmap',
            self::Custom => 'Custom',
        };
    }
}
