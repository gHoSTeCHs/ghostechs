<?php

use App\Enums\PostStatus;
use App\Http\Requests\Admin\StorePostRequest;

it('requires title, body, and status', function () {
    $request = new StorePostRequest;
    $validator = validator([], $request->rules());

    expect($validator->errors()->has('title'))->toBeTrue();
    expect($validator->errors()->has('body'))->toBeTrue();
    expect($validator->errors()->has('status'))->toBeTrue();
});

it('validates status is a valid PostStatus enum', function () {
    $request = new StorePostRequest;
    $validator = validator([
        'title' => 'Test',
        'body' => 'Content',
        'status' => 'invalid',
    ], $request->rules());

    expect($validator->errors()->has('status'))->toBeTrue();
});

it('passes with valid data', function () {
    $request = new StorePostRequest;
    $validator = validator([
        'title' => 'My Post',
        'body' => 'Post content here',
        'status' => PostStatus::Draft->value,
    ], $request->rules());

    expect($validator->passes())->toBeTrue();
});

it('allows nullable excerpt and meta fields', function () {
    $request = new StorePostRequest;
    $validator = validator([
        'title' => 'My Post',
        'body' => 'Content',
        'status' => PostStatus::Published->value,
        'excerpt' => null,
        'meta_title' => null,
        'meta_description' => null,
    ], $request->rules());

    expect($validator->passes())->toBeTrue();
});
