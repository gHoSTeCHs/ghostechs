<?php

use App\Models\Post;
use App\Models\Project;
use App\Models\User;

it('redirects unauthenticated users to login', function () {
    $this->get(route('admin.dashboard'))
        ->assertRedirect(route('login'));
});

it('renders dashboard with counts and recent items', function () {
    $user = User::factory()->create();
    Project::factory()->count(3)->create();
    Post::factory()->count(2)->create();

    $this->actingAs($user)
        ->get(route('admin.dashboard'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/dashboard')
            ->has('counts', fn ($counts) => $counts
                ->where('projects', 3)
                ->where('posts', 2)
                ->where('tags', 0)
                ->where('technologies', 0)
                ->where('pages', 0)
            )
            ->has('recentItems')
        );
});
