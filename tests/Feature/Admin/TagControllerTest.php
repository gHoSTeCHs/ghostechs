<?php

use App\Models\Tag;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
});

it('redirects unauthenticated users to login', function () {
    $this->get(route('admin.tags.index'))
        ->assertRedirect(route('login'));
});

it('renders index with tags and post counts', function () {
    Tag::factory()->count(2)->create();

    $this->actingAs($this->user)
        ->get(route('admin.tags.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/tags/index')
            ->has('tags', 2)
        );
});

it('stores a tag', function () {
    $this->actingAs($this->user)
        ->post(route('admin.tags.store'), [
            'name' => 'Laravel',
        ])
        ->assertRedirect(route('admin.tags.index'))
        ->assertSessionHas('success');

    expect(Tag::query()->where('slug', 'laravel')->exists())->toBeTrue();
});

it('deletes a tag', function () {
    $tag = Tag::factory()->create();

    $this->actingAs($this->user)
        ->delete(route('admin.tags.destroy', $tag))
        ->assertRedirect(route('admin.tags.index'))
        ->assertSessionHas('success');

    expect(Tag::query()->find($tag->id))->toBeNull();
});
