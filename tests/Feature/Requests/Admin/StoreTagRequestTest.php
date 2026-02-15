<?php

use App\Http\Requests\Admin\StoreTagRequest;
use App\Models\Tag;

it('requires a name', function () {
    $request = new StoreTagRequest;
    $rules = $request->rules();

    expect($rules['name'])->toContain('required');
});

it('limits name to 100 characters', function () {
    $request = new StoreTagRequest;
    $rules = $request->rules();

    expect($rules['name'])->toContain('max:100');
});

it('enforces unique name', function () {
    Tag::factory()->create(['name' => 'Existing']);

    $request = new StoreTagRequest;
    $validator = validator(['name' => 'Existing'], $request->rules());

    expect($validator->fails())->toBeTrue();
});

it('passes with valid data', function () {
    $request = new StoreTagRequest;
    $validator = validator(['name' => 'New Tag'], $request->rules());

    expect($validator->passes())->toBeTrue();
});

it('authorizes the request', function () {
    $request = new StoreTagRequest;

    expect($request->authorize())->toBeTrue();
});
