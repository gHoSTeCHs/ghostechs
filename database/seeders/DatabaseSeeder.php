<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::query()->firstOrCreate(
            ['email' => config('app.admin_email', 'admin@example.com')],
            [
                'name' => config('app.admin_name', 'Admin'),
                'password' => bcrypt(config('app.admin_password', 'password')),
            ],
        );

        $this->call([
            TechnologySeeder::class,
            ProjectSeeder::class,
            PageSeeder::class,
            SiteSettingSeeder::class,
        ]);
    }
}
