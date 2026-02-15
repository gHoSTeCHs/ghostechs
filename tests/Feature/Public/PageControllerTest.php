<?php

use App\Models\Page;
use App\Models\SiteSetting;

it('renders about page with body_html', function () {
    Page::factory()->create(['slug' => 'about', 'body' => '# About Me']);

    $this->get(route('about'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('about')
            ->has('page')
            ->has('settings')
        );
});

it('renders contact page with settings', function () {
    $this->get(route('contact'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('contact')
            ->has('settings')
        );
});

it('renders resume page with settings and resume url', function () {
    SiteSetting::query()->create(['key' => 'resume_url', 'value' => 'https://example.com/resume.pdf']);

    $this->get(route('resume'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('resume')
            ->has('settings')
            ->where('resumeUrl', 'https://example.com/resume.pdf')
        );
});
