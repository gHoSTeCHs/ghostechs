<?php

use App\Models\Post;
use App\Models\Project;

it('returns xml content type', function () {
    $response = $this->get('/sitemap.xml');

    $response->assertOk();
    $response->assertHeader('Content-Type', 'text/xml; charset=UTF-8');
});

it('contains static pages', function () {
    $response = $this->get('/sitemap.xml');

    $response->assertOk();
    $response->assertSee(url('/'));
    $response->assertSee(url('/about'));
    $response->assertSee(url('/blog'));
    $response->assertSee(url('/contact'));
});

it('contains visible projects', function () {
    $visible = Project::factory()->create(['is_visible' => true, 'slug' => 'visible-project']);
    $hidden = Project::factory()->create(['is_visible' => false, 'slug' => 'hidden-project']);

    $response = $this->get('/sitemap.xml');

    $response->assertOk();
    $response->assertSee(url('/projects/visible-project'));
    $response->assertDontSee(url('/projects/hidden-project'));
});

it('contains published posts', function () {
    $published = Post::factory()->published()->create(['slug' => 'published-post']);
    $draft = Post::factory()->create(['slug' => 'draft-post']);

    $response = $this->get('/sitemap.xml');

    $response->assertOk();
    $response->assertSee(url('/blog/published-post'));
    $response->assertDontSee(url('/blog/draft-post'));
});

it('returns valid xml structure', function () {
    $response = $this->get('/sitemap.xml');

    $response->assertOk();
    $response->assertSee('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', false);
    $response->assertSee('</urlset>', false);
});
