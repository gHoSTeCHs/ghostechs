<?php

use App\Models\Page;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
});

it('redirects unauthenticated users to login', function () {
    $this->get(route('admin.pages.edit', 'about'))
        ->assertRedirect(route('login'));
});

it('renders edit form for a page', function () {
    Page::factory()->create(['slug' => 'about']);

    $this->actingAs($this->user)
        ->get(route('admin.pages.edit', 'about'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/pages/form')
            ->has('page')
        );
});

it('updates a page', function () {
    $page = Page::factory()->create(['slug' => 'about']);

    $this->actingAs($this->user)
        ->put(route('admin.pages.update', $page), [
            'title' => 'Updated About',
            'body' => 'Updated body content',
        ])
        ->assertRedirect()
        ->assertSessionHas('success');

    expect($page->refresh()->title)->toBe('Updated About');
});
