<?php

use App\Http\Requests\Admin\StoreTechnologyRequest;

it('requires a name', function () {
    $request = new StoreTechnologyRequest;
    $validator = validator([], $request->rules());

    expect($validator->errors()->has('name'))->toBeTrue();
});

it('passes with valid data', function () {
    $request = new StoreTechnologyRequest;
    $validator = validator(['name' => 'Laravel'], $request->rules());

    expect($validator->passes())->toBeTrue();
});

it('allows nullable category', function () {
    $request = new StoreTechnologyRequest;
    $validator = validator(['name' => 'React', 'category' => null], $request->rules());

    expect($validator->passes())->toBeTrue();
});

it('limits category to 50 characters', function () {
    $request = new StoreTechnologyRequest;
    $rules = $request->rules();

    expect($rules['category'])->toContain('max:50');
});
