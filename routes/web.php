<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\PageController as AdminPageController;
use App\Http\Controllers\Admin\PostController as AdminPostController;
use App\Http\Controllers\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Admin\ProjectSectionController;
use App\Http\Controllers\Admin\SiteSettingController;
use App\Http\Controllers\Admin\TagController;
use App\Http\Controllers\Admin\TechnologyController;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\PageController;
use App\Http\Controllers\Public\PostController;
use App\Http\Controllers\Public\ProjectController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/projects/{slug}', [ProjectController::class, 'show'])->name('projects.show');
Route::get('/blog', [PostController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [PostController::class, 'show'])->name('blog.show');
Route::get('/about', [PageController::class, 'about'])->name('about');
Route::get('/contact', [PageController::class, 'contact'])->name('contact');
Route::get('/resume', [PageController::class, 'resume'])->name('resume');

Route::redirect('/dashboard', '/admin');

Route::prefix('admin')->middleware(['auth'])->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/projects', [AdminProjectController::class, 'index'])->name('projects.index');
    Route::get('/projects/create', [AdminProjectController::class, 'create'])->name('projects.create');
    Route::post('/projects', [AdminProjectController::class, 'store'])->name('projects.store');
    Route::get('/projects/{project}/edit', [AdminProjectController::class, 'edit'])->name('projects.edit');
    Route::put('/projects/{project}', [AdminProjectController::class, 'update'])->name('projects.update');
    Route::delete('/projects/{project}', [AdminProjectController::class, 'destroy'])->name('projects.destroy');
    Route::post('/projects/reorder', [AdminProjectController::class, 'reorder'])->name('projects.reorder');

    Route::get('/projects/{project}/sections', [ProjectSectionController::class, 'index'])->name('projects.sections.index');
    Route::get('/projects/{project}/sections/create', [ProjectSectionController::class, 'create'])->name('projects.sections.create');
    Route::post('/projects/{project}/sections', [ProjectSectionController::class, 'store'])->name('projects.sections.store');
    Route::get('/sections/{section}/edit', [ProjectSectionController::class, 'edit'])->name('sections.edit');
    Route::put('/sections/{section}', [ProjectSectionController::class, 'update'])->name('sections.update');
    Route::delete('/sections/{section}', [ProjectSectionController::class, 'destroy'])->name('sections.destroy');
    Route::post('/projects/{project}/sections/reorder', [ProjectSectionController::class, 'reorder'])->name('projects.sections.reorder');

    Route::get('/posts', [AdminPostController::class, 'index'])->name('posts.index');
    Route::get('/posts/create', [AdminPostController::class, 'create'])->name('posts.create');
    Route::post('/posts', [AdminPostController::class, 'store'])->name('posts.store');
    Route::get('/posts/{post}/edit', [AdminPostController::class, 'edit'])->name('posts.edit');
    Route::put('/posts/{post}', [AdminPostController::class, 'update'])->name('posts.update');
    Route::delete('/posts/{post}', [AdminPostController::class, 'destroy'])->name('posts.destroy');

    Route::get('/tags', [TagController::class, 'index'])->name('tags.index');
    Route::post('/tags', [TagController::class, 'store'])->name('tags.store');
    Route::delete('/tags/{tag}', [TagController::class, 'destroy'])->name('tags.destroy');

    Route::get('/technologies', [TechnologyController::class, 'index'])->name('technologies.index');
    Route::post('/technologies', [TechnologyController::class, 'store'])->name('technologies.store');
    Route::put('/technologies/{technology}', [TechnologyController::class, 'update'])->name('technologies.update');
    Route::delete('/technologies/{technology}', [TechnologyController::class, 'destroy'])->name('technologies.destroy');

    Route::get('/pages/{slug}/edit', [AdminPageController::class, 'edit'])->name('pages.edit');
    Route::put('/pages/{page}', [AdminPageController::class, 'update'])->name('pages.update');

    Route::get('/settings', [SiteSettingController::class, 'index'])->name('settings.index');
    Route::put('/settings', [SiteSettingController::class, 'update'])->name('settings.update');

    Route::post('/media', [MediaController::class, 'store'])->name('media.store');
    Route::delete('/media/{media}', [MediaController::class, 'destroy'])->name('media.destroy');
});

require __DIR__.'/settings.php';
