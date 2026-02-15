<?php

use App\Models\Technology;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
});

it('redirects unauthenticated users to login', function () {
    $this->get(route('admin.technologies.index'))
        ->assertRedirect(route('login'));
});

it('renders index with technologies and project counts', function () {
    Technology::factory()->count(2)->create();

    $this->actingAs($this->user)
        ->get(route('admin.technologies.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/technologies/index')
            ->has('technologies', 2)
        );
});

it('stores a technology', function () {
    $this->actingAs($this->user)
        ->post(route('admin.technologies.store'), [
            'name' => 'React',
        ])
        ->assertRedirect(route('admin.technologies.index'))
        ->assertSessionHas('success');

    expect(Technology::query()->where('slug', 'react')->exists())->toBeTrue();
});

it('updates a technology', function () {
    $tech = Technology::factory()->create();

    $this->actingAs($this->user)
        ->put(route('admin.technologies.update', $tech), [
            'name' => 'Vue.js',
        ])
        ->assertRedirect()
        ->assertSessionHas('success');

    expect($tech->refresh()->name)->toBe('Vue.js');
});

it('deletes a technology', function () {
    $tech = Technology::factory()->create();

    $this->actingAs($this->user)
        ->delete(route('admin.technologies.destroy', $tech))
        ->assertRedirect(route('admin.technologies.index'))
        ->assertSessionHas('success');

    expect(Technology::query()->find($tech->id))->toBeNull();
});
