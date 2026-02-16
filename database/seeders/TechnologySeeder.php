<?php

namespace Database\Seeders;

use App\Models\Technology;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TechnologySeeder extends Seeder
{
    public function run(): void
    {
        $technologies = [
            ['name' => 'Laravel', 'category' => 'Backend'],
            ['name' => 'Inertia.js', 'category' => 'Backend'],
            ['name' => 'PHP', 'category' => 'Language'],
            ['name' => 'TypeScript', 'category' => 'Language'],
            ['name' => 'Kotlin', 'category' => 'Language'],
            ['name' => 'React', 'category' => 'Frontend'],
            ['name' => 'Tailwind CSS', 'category' => 'Frontend'],
            ['name' => 'Framer Motion', 'category' => 'Frontend'],
            ['name' => 'GSAP', 'category' => 'Frontend'],
            ['name' => 'Alpine.js', 'category' => 'Frontend'],
            ['name' => 'PostgreSQL', 'category' => 'Database'],
            ['name' => 'Redis', 'category' => 'Database'],
            ['name' => 'Meilisearch', 'category' => 'Database'],
            ['name' => 'Cloudflare R2', 'category' => 'Infrastructure'],
            ['name' => 'Nginx', 'category' => 'Infrastructure'],
            ['name' => 'Android', 'category' => 'Mobile'],
        ];

        foreach ($technologies as $tech) {
            Technology::query()->firstOrCreate(
                ['slug' => Str::slug($tech['name'])],
                [
                    'name' => $tech['name'],
                    'category' => $tech['category'],
                ],
            );
        }
    }
}
