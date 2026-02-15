<?php

use App\Models\SiteSetting;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
});

it('redirects unauthenticated users to login', function () {
    $this->get(route('admin.settings.index'))
        ->assertRedirect(route('login'));
});

it('renders settings index', function () {
    SiteSetting::query()->create(['key' => 'site_name', 'value' => 'My Site']);

    $this->actingAs($this->user)
        ->get(route('admin.settings.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/settings/index')
            ->has('settings')
        );
});

it('updates settings', function () {
    $this->actingAs($this->user)
        ->put(route('admin.settings.update'), [
            'settings' => [
                'site_name' => 'Updated Site',
                'tagline' => 'New Tagline',
            ],
        ])
        ->assertRedirect()
        ->assertSessionHas('success');

    expect(SiteSetting::getByKey('site_name'))->toBe('Updated Site');
    expect(SiteSetting::getByKey('tagline'))->toBe('New Tagline');
});
