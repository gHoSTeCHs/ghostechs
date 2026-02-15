<?php

use App\Http\Requests\Admin\UpdateSiteSettingsRequest;

it('requires settings array', function () {
    $request = new UpdateSiteSettingsRequest;
    $validator = validator([], $request->rules());

    expect($validator->errors()->has('settings'))->toBeTrue();
});

it('passes with valid settings', function () {
    $request = new UpdateSiteSettingsRequest;
    $validator = validator([
        'settings' => ['site_name' => 'Portfolio', 'tagline' => 'My Work'],
    ], $request->rules());

    expect($validator->passes())->toBeTrue();
});

it('limits setting values to 1000 characters', function () {
    $request = new UpdateSiteSettingsRequest;
    $rules = $request->rules();

    expect($rules['settings.*'])->toContain('max:1000');
});

it('allows nullable setting values', function () {
    $request = new UpdateSiteSettingsRequest;
    $validator = validator([
        'settings' => ['site_name' => null],
    ], $request->rules());

    expect($validator->passes())->toBeTrue();
});
