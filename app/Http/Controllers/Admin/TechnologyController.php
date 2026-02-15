<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTechnologyRequest;
use App\Http\Requests\Admin\UpdateTechnologyRequest;
use App\Models\Technology;
use App\Services\TechnologyService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TechnologyController extends Controller
{
    public function __construct(
        private TechnologyService $technologyService,
    ) {}

    public function index(): Response
    {
        return Inertia::render('admin/technologies/index', [
            'technologies' => $this->technologyService->getAll(),
        ]);
    }

    public function store(StoreTechnologyRequest $request): RedirectResponse
    {
        $this->technologyService->create($request->validated());

        return to_route('admin.technologies.index')
            ->with('success', 'Technology created.');
    }

    public function update(UpdateTechnologyRequest $request, Technology $technology): RedirectResponse
    {
        $this->technologyService->update($technology, $request->validated());

        return back()->with('success', 'Technology updated.');
    }

    public function destroy(Technology $technology): RedirectResponse
    {
        $this->technologyService->delete($technology);

        return to_route('admin.technologies.index')
            ->with('success', 'Technology deleted.');
    }
}
