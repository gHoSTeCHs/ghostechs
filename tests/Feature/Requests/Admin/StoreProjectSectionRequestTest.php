<?php

use App\Enums\SectionType;
use App\Http\Requests\Admin\StoreProjectSectionRequest;

it('requires type, title, and body', function () {
    $request = new StoreProjectSectionRequest;
    $validator = validator([], $request->rules());

    expect($validator->errors()->has('type'))->toBeTrue();
    expect($validator->errors()->has('title'))->toBeTrue();
    expect($validator->errors()->has('body'))->toBeTrue();
});

it('validates type is a valid SectionType enum', function () {
    $request = new StoreProjectSectionRequest;
    $validator = validator([
        'type' => 'invalid',
        'title' => 'Title',
        'body' => 'Body',
    ], $request->rules());

    expect($validator->errors()->has('type'))->toBeTrue();
});

it('passes with valid data', function () {
    $request = new StoreProjectSectionRequest;
    $validator = validator([
        'type' => SectionType::Overview->value,
        'title' => 'Overview Section',
        'body' => 'Section content',
    ], $request->rules());

    expect($validator->passes())->toBeTrue();
});
