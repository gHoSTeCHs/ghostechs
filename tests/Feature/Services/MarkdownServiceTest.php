<?php

use App\Services\MarkdownService;

beforeEach(function () {
    $this->service = app(MarkdownService::class);
});

it('converts basic markdown to html', function () {
    $html = $this->service->toHtml('# Hello World');

    expect($html)->toContain('<h1');
    expect($html)->toContain('Hello World');
});

it('converts paragraphs and bold text', function () {
    $html = $this->service->toHtml("This is **bold** text.\n\nAnother paragraph.");

    expect($html)->toContain('<strong>bold</strong>');
    expect($html)->toContain('<p>');
});

it('supports GFM tables', function () {
    $markdown = <<<'MD'
    | Header | Value |
    |--------|-------|
    | Cell   | Data  |
    MD;

    $html = $this->service->toHtml($markdown);

    expect($html)->toContain('<table>');
    expect($html)->toContain('<th>');
    expect($html)->toContain('<td>');
});

it('supports GFM strikethrough', function () {
    $html = $this->service->toHtml('~~deleted~~');

    expect($html)->toContain('<del>deleted</del>');
});

it('adds heading permalinks', function () {
    $html = $this->service->toHtml('## My Section');

    expect($html)->toContain('heading-permalink');
    expect($html)->toContain('my-section');
});

it('returns singleton instance', function () {
    $instance1 = app(MarkdownService::class);
    $instance2 = app(MarkdownService::class);

    expect($instance1)->toBe($instance2);
});

it('estimates reading time for short content as 1 minute minimum', function () {
    $markdown = str_repeat('word ', 50);

    expect($this->service->estimateReadingTime($markdown))->toBe(1);
});

it('estimates reading time for longer content', function () {
    $markdown = str_repeat('word ', 600);

    expect($this->service->estimateReadingTime($markdown))->toBe(3);
});

it('estimates reading time for empty content as 1 minute', function () {
    expect($this->service->estimateReadingTime(''))->toBe(1);
});
