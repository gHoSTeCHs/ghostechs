<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Services\MarkdownService;
use App\Services\PageService;
use App\Services\SiteSettingService;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function __construct(
        private PageService $pageService,
        private MarkdownService $markdownService,
        private SiteSettingService $settingService,
    ) {}

    public function about(): Response
    {
        $page = $this->pageService->getBySlug('about');
        $page->body_html = $this->markdownService->toHtml($page->body);

        return Inertia::render('about', [
            'page' => $page,
        ]);
    }

    public function contact(): Response
    {
        return Inertia::render('contact');
    }

    public function resume(): Response
    {
        $settings = $this->settingService->getPublicSettings();

        return Inertia::render('resume', [
            'resumeUrl' => $settings['resume_url'] ?? null,
        ]);
    }
}
