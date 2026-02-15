<?php

use App\Enums\ProjectStatus;
use App\Http\Requests\Admin\UpdateProjectRequest;

it('requires title, tagline, description, and status', function () {
    $request = new UpdateProjectRequest;
    $validator = validator([], $request->rules());

    expect($validator->errors()->has('title'))->toBeTrue();
    expect($validator->errors()->has('status'))->toBeTrue();
});

it('passes with valid data', function () {
    $request = new UpdateProjectRequest;
    $validator = validator([
        'title' => 'Updated Project',
        'tagline' => 'Updated tagline',
        'description' => 'Updated description',
        'status' => ProjectStatus::Released->value,
    ], $request->rules());

    expect($validator->passes())->toBeTrue();
});

it('authorizes the request', function () {
    $request = new UpdateProjectRequest;

    expect($request->authorize())->toBeTrue();
});
