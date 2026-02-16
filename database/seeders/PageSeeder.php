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
                'body' => <<<'MD'
I'm a full-stack developer passionate about building **robust, scalable web applications**. I specialize in Laravel, React, and TypeScript, with a focus on solving real problems across fintech, logistics, and education.

### What I Do

- **Backend architecture** — designing service layers, APIs, and database schemas that scale
- **Frontend development** — building interactive, accessible interfaces with React and TypeScript
- **DevOps** — deploying and maintaining applications on cloud infrastructure

### My Approach

I believe in writing **clean, maintainable code** and building products that make a meaningful impact. Every project starts with understanding the problem deeply before writing a single line of code.

> "Good software is built by people who care about the details — from database indexes to button hover states."

### Beyond Code

When I'm not coding, I'm:

- Exploring new technologies and frameworks
- Contributing to open-source projects
- Writing about software engineering on my [blog](/blog)
- Mentoring aspiring developers
MD,
                'meta_title' => 'About — Somadina',
                'meta_description' => 'Full-stack developer specializing in Laravel, React, and TypeScript.',
            ],
        );
    }
}
