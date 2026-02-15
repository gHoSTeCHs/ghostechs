<?php

use App\Models\Post;
use App\Models\Tag;

it('renders blog index with published posts', function () {
    Post::factory()->published()->count(2)->create();
    Post::factory()->draft()->create();

    $this->get(route('blog.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('blog/index')
            ->has('posts', 2)
            ->has('tags')
            ->where('activeTag', null)
            ->has('settings')
        );
});

it('filters posts by tag', function () {
    $tag = Tag::factory()->create();
    $tagged = Post::factory()->published()->create();
    $tagged->tags()->attach($tag);
    Post::factory()->published()->create();

    $this->get(route('blog.index', ['tag' => $tag->slug]))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->has('posts', 1)
            ->where('activeTag', $tag->slug)
        );
});

it('renders blog show with body_html', function () {
    $post = Post::factory()->published()->create(['slug' => 'test-post', 'body' => '# Heading']);

    $this->get(route('blog.show', 'test-post'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('blog/show')
            ->has('post')
            ->has('relatedPosts')
            ->has('settings')
        );
});

it('returns 404 for draft post', function () {
    Post::factory()->draft()->create(['slug' => 'draft-post']);

    $this->get(route('blog.show', 'draft-post'))
        ->assertNotFound();
});
