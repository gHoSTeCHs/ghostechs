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
            ['name' => 'React', 'category' => 'Frontend'],
            ['name' => 'TypeScript', 'category' => 'Language'],
            ['name' => 'Tailwind CSS', 'category' => 'Frontend'],
            ['name' => 'PostgreSQL', 'category' => 'Database'],
            ['name' => 'PHP', 'category' => 'Language'],
            ['name' => 'Android', 'category' => 'Mobile'],
            ['name' => 'Kotlin', 'category' => 'Language'],
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
