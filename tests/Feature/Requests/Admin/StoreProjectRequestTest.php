<?php

use App\Enums\ProjectStatus;
use App\Http\Requests\Admin\StoreProjectRequest;
use App\Models\Technology;

it('requires title, tagline, description, and status', function () {
    $request = new StoreProjectRequest;
    $validator = validator([], $request->rules());

    expect($validator->errors()->has('title'))->toBeTrue();
    expect($validator->errors()->has('tagline'))->toBeTrue();
    expect($validator->errors()->has('description'))->toBeTrue();
    expect($validator->errors()->has('status'))->toBeTrue();
});

it('validates status is a valid ProjectStatus enum', function () {
    $request = new StoreProjectRequest;
    $validator = validator([
        'title' => 'Test',
        'tagline' => 'Tagline',
        'description' => 'Desc',
        'status' => 'invalid_status',
    ], $request->rules());

    expect($validator->errors()->has('status'))->toBeTrue();
});

it('passes with valid data', function () {
    $request = new StoreProjectRequest;
    $validator = validator([
        'title' => 'My Project',
        'tagline' => 'A great project',
        'description' => 'Full description here',
        'status' => ProjectStatus::InDevelopment->value,
    ], $request->rules());

    expect($validator->passes())->toBeTrue();
});

it('validates technology_ids exist', function () {
    $tech = Technology::factory()->create();
    $request = new StoreProjectRequest;

    $validator = validator([
        'title' => 'Test',
        'tagline' => 'Tag',
        'description' => 'Desc',
        'status' => ProjectStatus::Production->value,
        'technology_ids' => [$tech->id, 9999],
    ], $request->rules());

    expect($validator->errors()->has('technology_ids.1'))->toBeTrue();
});

it('validates urls are valid', function () {
    $request = new StoreProjectRequest;
    $validator = validator([
        'title' => 'Test',
        'tagline' => 'Tag',
        'description' => 'Desc',
        'status' => ProjectStatus::Production->value,
        'external_url' => 'not-a-url',
    ], $request->rules());

    expect($validator->errors()->has('external_url'))->toBeTrue();
});
