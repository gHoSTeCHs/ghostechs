<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateSiteSettingsRequest;
use App\Services\SiteSettingService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SiteSettingController extends Controller
{
    public function __construct(
        private SiteSettingService $settingService,
    ) {}

    public function index(): Response
    {
        return Inertia::render('admin/settings/index', [
            'settings' => $this->settingService->getAll(),
        ]);
    }

    public function update(UpdateSiteSettingsRequest $request): RedirectResponse
    {
        $this->settingService->update($request->validated()['settings']);

        return back()->with('success', 'Settings updated.');
    }
}
