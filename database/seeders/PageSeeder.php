<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    public function run(): void
    {
        Page::query()->firstOrCreate(
            ['slug' => 'about'],
            [
                'title' => 'About Me',
                'body' => "I'm a full-stack developer passionate about building robust, scalable web applications. I specialize in Laravel, React, and TypeScript, with a focus on solving real problems across fintech, logistics, and education.\n\nI believe in writing clean, maintainable code and building products that make a meaningful impact. When I'm not coding, I'm exploring new technologies and contributing to open-source projects.",
                'meta_title' => 'About — Somadina',
                'meta_description' => 'Full-stack developer specializing in Laravel, React, and TypeScript.',
            ],
        );
    }
}
