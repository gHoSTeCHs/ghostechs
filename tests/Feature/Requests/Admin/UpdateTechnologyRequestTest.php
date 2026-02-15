<?php

use App\Http\Requests\Admin\UpdateTechnologyRequest;

it('requires a name', function () {
    $request = new UpdateTechnologyRequest;
    $validator = validator([], $request->rules());

    expect($validator->errors()->has('name'))->toBeTrue();
});

it('passes with valid data', function () {
    $request = new UpdateTechnologyRequest;
    $validator = validator(['name' => 'Updated Tech'], $request->rules());

    expect($validator->passes())->toBeTrue();
});

it('authorizes the request', function () {
    $request = new UpdateTechnologyRequest;

    expect($request->authorize())->toBeTrue();
});
