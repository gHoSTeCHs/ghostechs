<?php

use App\Http\Requests\Admin\UpdatePageRequest;

it('requires title and body', function () {
    $request = new UpdatePageRequest;
    $validator = validator([], $request->rules());

    expect($validator->errors()->has('title'))->toBeTrue();
    expect($validator->errors()->has('body'))->toBeTrue();
});

it('passes with valid data', function () {
    $request = new UpdatePageRequest;
    $validator = validator([
        'title' => 'About Page',
        'body' => 'This is the about page.',
    ], $request->rules());

    expect($validator->passes())->toBeTrue();
});

it('allows nullable meta fields', function () {
    $request = new UpdatePageRequest;
    $validator = validator([
        'title' => 'About',
        'body' => 'Content',
        'meta_title' => null,
        'meta_description' => null,
    ], $request->rules());

    expect($validator->passes())->toBeTrue();
});
