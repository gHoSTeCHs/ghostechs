<?php

use App\Models\Post;
use App\Models\Project;

it('renders welcome page with projects, featured posts, and settings', function () {
    Project::factory()->count(2)->create(['is_visible' => true]);
    Post::factory()->published()->featured()->count(1)->create();

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('welcome')
            ->has('projects', 2)
            ->has('featuredPosts', 1)
            ->has('settings')
        );
});

it('excludes hidden projects', function () {
    Project::factory()->create(['is_visible' => true]);
    Project::factory()->hidden()->create();

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->has('projects', 1)
        );
});
