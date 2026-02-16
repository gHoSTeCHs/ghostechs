<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SiteSettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            'site_name' => 'Somadina',
            'tagline' => 'Full-Stack Developer',
            'bio' => 'Building robust, scalable web applications with Laravel, React, and TypeScript.',
            'hero_text' => 'Building robust, scalable web applications with Laravel, React, and TypeScript. Focused on solving real problems across fintech, logistics, and education.',
            'github_url' => 'https://github.com/somadina',
            'linkedin_url' => 'https://linkedin.com/in/somadina',
            'twitter_url' => 'https://x.com/somadina',
            'email' => 'hello@somadina.dev',
        ];

        foreach ($settings as $key => $value) {
            SiteSetting::query()->firstOrCreate(
                ['key' => $key],
                ['value' => $value],
            );
        }
    }
}
