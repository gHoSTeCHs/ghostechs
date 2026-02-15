<?php

use App\Enums\SectionType;
use App\Http\Requests\Admin\UpdateProjectSectionRequest;

it('requires type, title, and body', function () {
    $request = new UpdateProjectSectionRequest;
    $validator = validator([], $request->rules());

    expect($validator->errors()->has('type'))->toBeTrue();
    expect($validator->errors()->has('title'))->toBeTrue();
    expect($validator->errors()->has('body'))->toBeTrue();
});

it('passes with valid data', function () {
    $request = new UpdateProjectSectionRequest;
    $validator = validator([
        'type' => SectionType::Architecture->value,
        'title' => 'Architecture',
        'body' => 'Content',
    ], $request->rules());

    expect($validator->passes())->toBeTrue();
});

it('authorizes the request', function () {
    $request = new UpdateProjectSectionRequest;

    expect($request->authorize())->toBeTrue();
});
