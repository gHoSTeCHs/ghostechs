<?php

use App\Enums\PostStatus;
use App\Http\Requests\Admin\UpdatePostRequest;

it('requires title, body, and status', function () {
    $request = new UpdatePostRequest;
    $validator = validator([], $request->rules());

    expect($validator->errors()->has('title'))->toBeTrue();
    expect($validator->errors()->has('body'))->toBeTrue();
    expect($validator->errors()->has('status'))->toBeTrue();
});

it('passes with valid data', function () {
    $request = new UpdatePostRequest;
    $validator = validator([
        'title' => 'Updated Post',
        'body' => 'Updated content',
        'status' => PostStatus::Published->value,
    ], $request->rules());

    expect($validator->passes())->toBeTrue();
});

it('authorizes the request', function () {
    $request = new UpdatePostRequest;

    expect($request->authorize())->toBeTrue();
});
