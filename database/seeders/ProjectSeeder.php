<?php

namespace Database\Seeders;

use App\Enums\ProjectStatus;
use App\Enums\SectionType;
use App\Models\Project;
use App\Models\ProjectSection;
use App\Models\Technology;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'slug' => 'shelfwiser',
                'title' => 'ShelfWiser',
                'tagline' => 'Smart inventory management for small businesses',
                'description' => 'A comprehensive inventory management system that helps small businesses track stock, manage orders, and optimize their supply chain.',
                'status' => ProjectStatus::Production,
                'is_featured' => true,
                'is_visible' => true,
                'sort_order' => 1,
                'technologies' => ['Laravel', 'React', 'TypeScript', 'PostgreSQL'],
                'sections' => [
                    ['type' => SectionType::Overview, 'title' => 'Overview', 'body' => 'ShelfWiser is a modern inventory management platform built for small and medium businesses. It provides real-time stock tracking, automated reorder alerts, and comprehensive reporting.'],
                    ['type' => SectionType::Architecture, 'title' => 'Architecture', 'body' => 'Built with a Laravel API backend and React frontend using Inertia.js for seamless SPA navigation. PostgreSQL handles complex inventory queries with excellent performance.'],
                    ['type' => SectionType::Lessons, 'title' => 'Lessons Learned', 'body' => 'Learned the importance of optimistic UI updates for inventory operations and implementing proper database transactions for stock movements.'],
                ],
            ],
            [
                'slug' => 'taxpadi',
                'title' => 'TaxPadi',
                'tagline' => 'Simplified tax filing for Nigerian freelancers',
                'description' => 'A fintech platform that simplifies tax compliance for freelancers and small businesses in Nigeria.',
                'status' => ProjectStatus::InDevelopment,
                'is_featured' => true,
                'is_visible' => true,
                'sort_order' => 2,
                'technologies' => ['Laravel', 'React', 'TypeScript', 'Tailwind CSS'],
                'sections' => [
                    ['type' => SectionType::Overview, 'title' => 'Overview', 'body' => 'TaxPadi automates tax calculations, generates filing documents, and provides guidance on tax obligations for Nigerian freelancers and small business owners.'],
                    ['type' => SectionType::Architecture, 'title' => 'Architecture', 'body' => 'Monolithic Laravel application with Inertia.js + React frontend. Uses queue workers for PDF generation and email notifications.'],
                ],
            ],
            [
                'slug' => 'batchdeliver',
                'title' => 'BatchDeliver',
                'tagline' => 'Logistics optimization for last-mile delivery',
                'description' => 'A delivery management platform that optimizes batch routing and real-time tracking for last-mile logistics.',
                'status' => ProjectStatus::InDevelopment,
                'is_featured' => true,
                'is_visible' => true,
                'sort_order' => 3,
                'technologies' => ['Laravel', 'PHP', 'PostgreSQL'],
                'sections' => [
                    ['type' => SectionType::Overview, 'title' => 'Overview', 'body' => 'BatchDeliver groups deliveries by proximity and optimizes routes to reduce delivery time and fuel costs for logistics companies.'],
                    ['type' => SectionType::Lessons, 'title' => 'Lessons Learned', 'body' => 'Working with geospatial data in PostgreSQL taught me about PostGIS extensions and the complexity of real-world routing algorithms.'],
                ],
            ],
            [
                'slug' => 'conceptflow',
                'title' => 'ConceptFlow',
                'tagline' => 'Visual brainstorming and idea management',
                'description' => 'A collaborative tool for visual brainstorming, concept mapping, and idea organization.',
                'status' => ProjectStatus::InDevelopment,
                'is_featured' => false,
                'is_visible' => true,
                'sort_order' => 4,
                'technologies' => ['React', 'TypeScript', 'Tailwind CSS'],
                'sections' => [
                    ['type' => SectionType::Overview, 'title' => 'Overview', 'body' => 'ConceptFlow provides an infinite canvas for creating concept maps, mind maps, and flowcharts with real-time collaboration.'],
                    ['type' => SectionType::Architecture, 'title' => 'Architecture', 'body' => 'Canvas rendering with HTML5 Canvas API, state management with Zustand, and WebSocket-based real-time sync.'],
                ],
            ],
            [
                'slug' => 'mockprep',
                'title' => 'MockPrep',
                'tagline' => 'AI-powered interview preparation platform',
                'description' => 'An educational platform that uses AI to simulate technical interviews and provide personalized feedback.',
                'status' => ProjectStatus::Released,
                'is_featured' => false,
                'is_visible' => true,
                'sort_order' => 5,
                'technologies' => ['Kotlin', 'Android'],
                'sections' => [
                    ['type' => SectionType::Overview, 'title' => 'Overview', 'body' => 'MockPrep generates contextual interview questions, evaluates responses, and provides detailed feedback to help candidates prepare for technical interviews.'],
                    ['type' => SectionType::Architecture, 'title' => 'Architecture', 'body' => 'Native Android application built with Kotlin, using MVVM architecture with Jetpack Compose for the UI layer.'],
                    ['type' => SectionType::Lessons, 'title' => 'Lessons Learned', 'body' => 'Designing effective AI prompts for interview simulation required extensive iteration and user testing to get natural-feeling conversations.'],
                ],
            ],
            [
                'slug' => 'verivote',
                'title' => 'VeriVote',
                'tagline' => 'Transparent blockchain-based voting system',
                'description' => 'A research project exploring blockchain technology for transparent and verifiable electronic voting.',
                'status' => ProjectStatus::Research,
                'is_featured' => false,
                'is_visible' => true,
                'sort_order' => 6,
                'technologies' => ['TypeScript', 'React'],
                'sections' => [
                    ['type' => SectionType::Overview, 'title' => 'Overview', 'body' => 'VeriVote explores how blockchain technology can be used to create a transparent, tamper-proof voting system while maintaining voter privacy.'],
                    ['type' => SectionType::Architecture, 'title' => 'Architecture', 'body' => 'Smart contract layer for vote recording, React frontend for voter interface, and a verification portal for auditing results.'],
                ],
            ],
        ];

        foreach ($projects as $data) {
            $technologies = $data['technologies'];
            $sections = $data['sections'];
            unset($data['technologies'], $data['sections']);

            $project = Project::query()->firstOrCreate(
                ['slug' => $data['slug']],
                $data,
            );

            $techIds = Technology::query()
                ->whereIn('name', $technologies)
                ->pluck('id');
            $project->technologies()->syncWithoutDetaching($techIds);

            foreach ($sections as $index => $section) {
                ProjectSection::query()->firstOrCreate(
                    [
                        'project_id' => $project->id,
                        'type' => $section['type'],
                    ],
                    [
                        'title' => $section['title'],
                        'body' => $section['body'],
                        'sort_order' => $index + 1,
                        'is_visible' => true,
                    ],
                );
            }
        }
    }
}
