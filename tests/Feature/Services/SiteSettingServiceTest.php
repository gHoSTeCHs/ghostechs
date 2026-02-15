<?php

use App\Models\SiteSetting;
use App\Services\SiteSettingService;

beforeEach(function () {
    $this->service = app(SiteSettingService::class);
});

it('returns all settings as array', function () {
    SiteSetting::factory()->create(['key' => 'site_name', 'value' => 'Portfolio']);
    SiteSetting::factory()->create(['key' => 'tagline', 'value' => 'My Work']);

    $settings = $this->service->getAll();

    expect($settings)->toHaveKey('site_name', 'Portfolio');
    expect($settings)->toHaveKey('tagline', 'My Work');
});

it('gets a single setting by key with default', function () {
    SiteSetting::factory()->create(['key' => 'theme', 'value' => 'dark']);

    expect($this->service->get('theme'))->toBe('dark');
    expect($this->service->get('missing', 'fallback'))->toBe('fallback');
});

it('returns public settings', function () {
    SiteSetting::factory()->create(['key' => 'site_name', 'value' => 'Portfolio']);

    $public = $this->service->getPublicSettings();

    expect($public)->toHaveKey('site_name', 'Portfolio');
});

it('upserts settings from array', function () {
    SiteSetting::factory()->create(['key' => 'site_name', 'value' => 'Old']);

    $this->service->update([
        'site_name' => 'New Portfolio',
        'tagline' => 'Fresh Work',
    ]);

    expect($this->service->get('site_name'))->toBe('New Portfolio');
    expect($this->service->get('tagline'))->toBe('Fresh Work');
});
