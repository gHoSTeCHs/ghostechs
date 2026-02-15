<?php

use App\Enums\PostStatus;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
});

it('redirects unauthenticated users to login', function () {
    $this->get(route('admin.posts.index'))
        ->assertRedirect(route('login'));
});

it('renders index with posts', function () {
    Post::factory()->count(3)->create();

    $this->actingAs($this->user)
        ->get(route('admin.posts.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/posts/index')
            ->has('posts', 3)
        );
});

it('renders create form with tags', function () {
    Tag::factory()->count(2)->create();

    $this->actingAs($this->user)
        ->get(route('admin.posts.create'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/posts/form')
            ->has('tags', 2)
        );
});

it('stores a post and redirects to edit', function () {
    $this->actingAs($this->user)
        ->post(route('admin.posts.store'), [
            'title' => 'My Blog Post',
            'body' => 'Post body content here',
            'status' => PostStatus::Draft->value,
        ])
        ->assertRedirect()
        ->assertSessionHas('success');

    expect(Post::query()->where('slug', 'my-blog-post')->exists())->toBeTrue();
});

it('renders edit form with post and tags', function () {
    $post = Post::factory()->create();

    $this->actingAs($this->user)
        ->get(route('admin.posts.edit', $post))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/posts/form')
            ->has('post')
            ->has('tags')
        );
});

it('updates a post', function () {
    $post = Post::factory()->create();

    $this->actingAs($this->user)
        ->put(route('admin.posts.update', $post), [
            'title' => 'Updated Post Title',
            'body' => $post->body,
            'status' => $post->status->value,
        ])
        ->assertRedirect()
        ->assertSessionHas('success');

    expect($post->refresh()->title)->toBe('Updated Post Title');
});

it('deletes a post', function () {
    $post = Post::factory()->create();

    $this->actingAs($this->user)
        ->delete(route('admin.posts.destroy', $post))
        ->assertRedirect(route('admin.posts.index'))
        ->assertSessionHas('success');

    expect(Post::query()->find($post->id))->toBeNull();
});
