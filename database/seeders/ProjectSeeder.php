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
                'slug' => 'amoriie',
                'title' => 'Amoriie',
                'tagline' => 'Cinematic Valentine experience platform',
                'description' => 'A consumer platform where creators build immersive, shareable Valentine experiences with cinematic templates, per-section audio, and zero-auth publishing.',
                'status' => ProjectStatus::Production,
                'is_featured' => true,
                'is_visible' => true,
                'sort_order' => 1,
                'technologies' => ['Laravel', 'Inertia.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Cloudflare R2'],
                'sections' => [
                    [
                        'type' => SectionType::Overview,
                        'title' => 'Overview',
                        'body' => <<<'MD'
Amoriie is a consumer platform where anyone can create an immersive, shareable Valentine experience in minutes — no account required.

### What It Does

Creators pick a template, fill in their content (text, photos, audio messages), and get a unique link they can share with their recipient. The recipient opens the link and steps through a cinematic, animated experience on any device.

### Templates

The platform launched with two customizable cinematic templates, each with distinct interaction patterns:

- **Fairytale Storybook** — a page-turning book with illustrated sections, background music, and per-page audio narration. Recipients flip through pages with swipe or click interactions.
- **Polaroid Gallery** — a collection of polaroid-style photo cards that animate into view with handwritten-style captions and audio messages attached to each photo.

Each template supports per-section audio, custom text, image uploads, and a final reveal section.

### Zero-Auth Flow

There is no signup wall. Creators land on the homepage, pick a template, fill in their content, preview it, and publish — all in a single session. The platform generates a unique slug-based URL for sharing. Average time from landing to published experience is about 3 minutes.

### Lifecycle

Experiences have a 90-day soft expiry (hidden from public listings) and a 180-day hard delete. Creators receive email reminders before expiry with the option to extend.
MD,
                    ],
                    [
                        'type' => SectionType::Architecture,
                        'title' => 'Architecture',
                        'body' => <<<'MD'
### Stack

Built on Laravel 12 with Inertia.js and React/TypeScript on the frontend. The entire app is a monolith — no separate API.

| Layer | Technology | Role |
|-------|-----------|------|
| Backend | Laravel 12 | Routing, storage, slug generation, lifecycle management |
| Bridge | Inertia.js | SPA-like navigation without a separate API |
| Frontend | React + TypeScript | Template rendering, animations, audio playback |
| Animation | Framer Motion + GSAP | Page transitions, reveal effects, scroll-triggered sequences |
| Storage | Cloudflare R2 | Image and audio file storage (S3-compatible) |
| Styling | Tailwind CSS | Responsive design, mobile-first layout |

### Client-Side Audio Pipeline

Audio processing happens entirely in the browser using Wavesurfer.js and the Web Audio API. When a creator records or uploads an audio clip:

1. Wavesurfer.js handles waveform visualization and trimming
2. The Web Audio API normalizes volume levels
3. The processed file uploads directly to Cloudflare R2

This eliminates server-side audio processing entirely, reducing infrastructure costs and cutting media pipeline complexity by roughly 70%.

### Dynamic OG Images

Each experience generates a unique Open Graph image using Satori (Vercel's OG image library). When a creator publishes, the system renders their chosen template's preview with the creator's text and first photo into a 1200x630 PNG. This means every shared link has a unique, branded preview on social media and messaging apps.

### Slug-Based URLs

Every experience gets a human-friendly URL like `amoriie.com/for/chioma`. Slugs are generated from the recipient's name with collision handling. The recipient views the experience at this URL — no auth, no app install, no friction.
MD,
                    ],
                    [
                        'type' => SectionType::Lessons,
                        'title' => 'Lessons Learned',
                        'body' => <<<'MD'
### Ship Date Pressure Changes Everything

Amoriie had exactly one deadline that could not move: February 14th. The entire platform was built and launched in 11 days. This forced ruthless prioritization — every feature got a simple question: "Does this need to exist for Valentine's Day?" If not, it got cut.

The original plan had 4 templates. Two shipped. The original plan had user accounts. Zero-auth shipped instead. The constraints produced a better product.

### Client-Side Audio Was the Right Call

The initial plan was server-side audio processing with FFmpeg. Estimating the infrastructure cost for potentially thousands of audio files being transcoded simultaneously made it clear this was the wrong approach for a product with zero revenue on day one. Moving to client-side processing with Wavesurfer.js and Web Audio API eliminated that cost entirely.

### Mobile-First Is Not Optional for Consumer Products

Early prototypes looked great on desktop and broke on mobile. For a product that people share via WhatsApp and Instagram DMs, the recipient is almost always on a phone. Every animation, every layout decision, every touch target was rebuilt mobile-first. Desktop became the afterthought.

### Zero-Auth Removes More Friction Than You Think

The original flow had a simple email signup before creating. Removing it entirely — no account, no email, no password — had a measurable impact on completion rate. People who land on the page and immediately start creating are far more likely to finish and share than people who hit a signup form first.
MD,
                    ],
                ],
            ],
            [
                'slug' => 'shelfwiser',
                'title' => 'ShelfWiser',
                'tagline' => 'Multi-tenant inventory management for Nigerian businesses',
                'description' => 'A multi-tenant SaaS platform helping small and medium businesses track inventory across locations with batch/expiry management, automated alerts, and granular access control.',
                'status' => ProjectStatus::Beta,
                'is_featured' => true,
                'is_visible' => true,
                'sort_order' => 2,
                'technologies' => ['Laravel', 'Inertia.js', 'React', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Redis'],
                'sections' => [
                    [
                        'type' => SectionType::Overview,
                        'title' => 'Overview',
                        'body' => <<<'MD'
ShelfWiser is a multi-tenant inventory management platform designed for Nigerian small and medium businesses — retail stores, wholesale distributors, and warehouse operators who have outgrown spreadsheets.

### The Problem

Most Nigerian SMEs track inventory in Excel, WhatsApp groups, or paper ledgers. This creates real operational pain:

- Products expire on shelves because nobody tracked the batch dates
- Stock transfers between locations happen over phone calls with no reconciliation
- Business owners can't see real-time inventory levels without physically visiting each location
- Staff access is all-or-nothing — the shop assistant has the same access as the manager

### What ShelfWiser Does

- **Multi-location inventory** — real-time stock levels across warehouses, stores, and fulfillment points with a single dashboard
- **Batch and expiry tracking** — every unit is tracked by batch number and expiration date, with automated alerts triggered before products expire
- **Stock transfers** — move inventory between locations with full reconciliation and audit trails
- **Granular RBAC** — 15+ configurable permission sets so tenant admins can define exactly what each team member can see and do
- **Automated reorder alerts** — configurable thresholds that notify before stockouts happen

### Multi-Tenancy

Each business (tenant) gets fully isolated data. The platform is designed to support 10,000+ SKUs per tenant across multiple warehouse locations. Tenant isolation is enforced at the query level — there is no scenario where one business sees another's data.
MD,
                    ],
                    [
                        'type' => SectionType::Architecture,
                        'title' => 'Architecture',
                        'body' => <<<'MD'
### Stack

Monolithic Laravel application with Inertia.js bridging to a React/TypeScript frontend.

| Layer | Technology | Role |
|-------|-----------|------|
| Backend | Laravel | Multi-tenant logic, business rules, queue processing |
| Bridge | Inertia.js | SPA-like navigation, no separate API layer |
| Frontend | React + TypeScript | Interactive dashboards, real-time stock views |
| Database | PostgreSQL | Complex inventory queries, batch tracking, audit logs |
| Cache/Queue | Redis | Session management, queue processing, cache layer |
| Styling | Tailwind CSS | Admin dashboard built on TailAdmin template |

### Service Layer Architecture

All business logic lives in dedicated service classes. Controllers handle request validation and response formatting only — they never contain business logic directly.

Stock movements, transfers, and batch operations go through service classes that wrap everything in database transactions. A stock transfer between two locations either fully succeeds or fully rolls back.

### Tenant Isolation

Multi-tenancy is implemented through scoped queries. Every model that belongs to a tenant uses a global scope that automatically filters by the authenticated user's tenant. This is enforced at the model level so it cannot be accidentally bypassed in a controller or service.

### Event-Driven Side Effects

Stock level changes dispatch events that trigger multiple listeners asynchronously: reorder alerts, low-stock warnings, expiry notifications, and audit log entries. This keeps the primary stock operation fast while handling side effects in the background via Redis-backed queues.
MD,
                    ],
                    [
                        'type' => SectionType::Lessons,
                        'title' => 'Lessons Learned',
                        'body' => <<<'MD'
### Database Transactions Are Non-Negotiable for Inventory

Early testing revealed a race condition where two concurrent operations could both read the same stock level, each deduct from it, and produce phantom stock. The fix was wrapping all stock mutations in database transactions with row-level locking. If two operations touch the same inventory row, one waits. There is no shortcut around this.

### Batch Tracking Adds Real Complexity

Tracking individual batches (not just total quantity) means every stock operation needs to know *which* batch to deduct from. FIFO (first in, first out) is the default strategy — sell the oldest batch first. This is straightforward in concept but adds significant query complexity when a single order might span multiple batches.

### RBAC Needs to Be Granular From Day One

The first version had simple roles: admin, manager, staff. Within weeks of beta testing, it became clear that every business has different access patterns. The manager at one store needs to see reports but not edit prices. The warehouse lead needs transfer permissions but not financial data. Rebuilding RBAC to be permission-based rather than role-based was the right decision, even though it was more work upfront.

### Multi-Tenant Testing Requires Discipline

Every feature needs to be tested with at least two tenants to verify isolation. It is surprisingly easy to write a query that works perfectly for a single tenant but leaks data when a second tenant exists. Automated tests that seed two tenants and verify cross-tenant isolation became a standard part of the test suite.
MD,
                    ],
                ],
            ],
            [
                'slug' => 'taxpadi',
                'title' => 'TaxPadi',
                'tagline' => 'Tax compliance simplified for Nigerian SMEs',
                'description' => 'A fintech platform that simplifies tax compliance for Nigerian freelancers and small businesses with OCR receipt parsing, automated calculations, and filing document generation.',
                'status' => ProjectStatus::PublicBeta,
                'is_featured' => true,
                'is_visible' => true,
                'sort_order' => 3,
                'technologies' => ['Laravel', 'Inertia.js', 'React', 'TypeScript', 'Tailwind CSS'],
                'sections' => [
                    [
                        'type' => SectionType::Overview,
                        'title' => 'Overview',
                        'body' => <<<'MD'
TaxPadi automates tax compliance for Nigerian freelancers and small business owners — a market of over 40 million micro and small enterprises that are largely underserved by existing tax software.

### The Problem

Nigeria's tax system is complex and poorly documented. Most small business owners either overpay because they don't know about eligible deductions, don't file at all because the process is too confusing, or pay accountants ₦50,000+ annually for basic compliance.

### What TaxPadi Does

- **OCR receipt parsing** — photograph a receipt and the system extracts the vendor, amount, date, and category automatically, achieving 85%+ accuracy on Nigerian receipts
- **Automated expense categorization** — expenses are classified across 20+ tax-deductible categories according to FIRS guidelines
- **Tax calculation engine** — computes VAT, WHT, CIT, and personal income tax with up-to-date rates
- **Mini-POS integration** — automatic VAT/WHT calculations at point of sale for small retailers
- **Filing document generation** — produces ready-to-submit PDF forms for the Federal Inland Revenue Service
- **Deadline reminders** — notifications before filing deadlines

### Target Market

The primary users are Nigerian freelancers, sole proprietors, and micro-businesses doing ₦1M–₦50M in annual revenue — large enough to have tax obligations but too small to justify a dedicated accountant.
MD,
                    ],
                    [
                        'type' => SectionType::Architecture,
                        'title' => 'Architecture',
                        'body' => <<<'MD'
### System Design

Monolithic Laravel application with Inertia.js + React on the frontend.

### Tax Calculation Pipeline

Each tax computation flows through a discrete pipeline of service classes:

```
Receipt Upload → OCR Extraction → Expense Categorization → Deduction Matching → Rate Application → Document Generation
```

Each step is its own service class, making the pipeline testable in isolation and extensible as Nigerian tax laws change (which they do frequently).

### OCR Integration

Receipt scanning uses a hybrid approach. The OCR model extracts raw text, then a post-processing layer parses Nigerian receipt formats — which vary wildly between POS terminals, handwritten receipts, and formal invoices. The parser handles Naira formatting, multiple date formats, and common OCR misreads on thermal paper receipts.

### Data Security

Financial data is encrypted at rest using Laravel's built-in encryption. Tax records are scoped per user with the same isolation patterns used in ShelfWiser. No user can access another user's financial data under any circumstances.
MD,
                    ],
                    [
                        'type' => SectionType::Lessons,
                        'title' => 'Lessons Learned',
                        'body' => <<<'MD'
### Nigerian Receipts Are Uniquely Challenging for OCR

Thermal paper receipts fade. Handwritten receipts have wildly inconsistent formatting. POS terminals from different banks produce different layouts. The OCR accuracy target of 85% required building a Nigerian-specific post-processing layer that handles all these variations — generic OCR models alone get maybe 60% accuracy on real-world Nigerian receipts.

### Tax Law Changes Break Things

Nigerian tax regulations change more frequently than expected, and sometimes retroactively. The tax calculation pipeline was specifically designed as a chain of independent service classes so that a rate change or a new deduction category only requires updating one class, not refactoring the entire flow.

### The Hardest Part Is Trust

For a product that handles people's financial data and tax filings, trust is the primary barrier to adoption — not features. Users need to believe the calculations are correct before they'll submit a filing based on them. This influenced the decision to show full calculation breakdowns at every step rather than just a final number.
MD,
                    ],
                ],
            ],
            [
                'slug' => 'skoolpad',
                'title' => 'Skoolpad',
                'tagline' => 'Past questions meets canonical knowledge for Nigerian students',
                'description' => 'An education platform linking past exam questions to a universal topic library across Nigerian universities and secondary schools, with AI study tools and JAMB/WAEC mock CBT simulation.',
                'status' => ProjectStatus::Research,
                'is_featured' => true,
                'is_visible' => true,
                'sort_order' => 4,
                'technologies' => ['Laravel', 'Inertia.js', 'React', 'TypeScript', 'PostgreSQL', 'Redis', 'Meilisearch', 'Tailwind CSS'],
                'sections' => [
                    [
                        'type' => SectionType::Overview,
                        'title' => 'Overview',
                        'body' => <<<'MD'
Skoolpad is an education platform for Nigerian students that connects past exam questions to a canonical topic library, enabling deeper understanding rather than rote memorization.

### The Core Idea

Nigerian students study past questions obsessively — it is the primary exam preparation strategy. But past questions are usually disconnected PDFs with no structure, no explanations, and no way to identify weak areas. Skoolpad links every question to the specific topics it tests, so students can see *why* they got something wrong and study the underlying concept.

### Three-Layer Content Model

The platform's architecture separates content into three distinct layers:

1. **Universal Knowledge Library** — a canonical repository of topics organized by discipline. These topics do not belong to any institution. "Binary Search Trees" is the same concept whether you study at MOUAU or UNILAG.
2. **Institution-Specific Course Mappings** — each university maps its courses to canonical topics. CSC 201 at MOUAU and COS 201 at UNILAG might both cover the same linked list topics, but they are different courses.
3. **Linked Exam Questions** — past exam questions are tagged to the canonical topics they test, regardless of which institution's exam they came from.

This means a student practicing "Quadratic Equations" gets questions from their own university plus relevant questions from other institutions and national exams — all testing the same underlying concept.

### Planned Feature Set

- Past question browser with filtering by institution, course, year, topic, and difficulty
- JAMB, WAEC, NECO, and GCE mock CBT simulation
- AI study suite: OCR for handwritten solutions, AI-powered grading, conversational study assistant
- IRT-calibrated question difficulty that adapts to student performance
- Social Q&A forum for peer discussion
- Timetable and academic calendar management

### Launch Scope

Starting with 5 institutions (MOUAU, IMSU, LASU, UNN, UNILAG) across 4 disciplines, with a 6-phase roadmap extending through institutional B2B licensing.
MD,
                    ],
                    [
                        'type' => SectionType::Architecture,
                        'title' => 'Architecture',
                        'body' => <<<'MD'
### Stack

| Layer | Technology | Role |
|-------|-----------|------|
| Backend | Laravel 12 | Business logic, content management, API |
| Bridge | Inertia.js | SPA-like navigation for student and admin interfaces |
| Frontend | React + TypeScript | Student dashboard, practice modes, CBT simulation |
| Database | PostgreSQL | Complex relational queries across the three-layer model |
| Search | Meilisearch (via Laravel Scout) | Full-text search across questions, topics, and courses |
| Cache/Queue | Redis | Session management, queue processing, AI job dispatching |
| Storage | Cloudflare R2 | Document uploads, OCR images, generated reports |
| Admin | TailAdmin template | Content management, institution CRUD, analytics |

### Database Design

The three-layer model drives the entire schema. The `canonical_topics` table is the foundation — every other content table references it. Institution courses map to canonical topics through a pivot table. Questions belong to either an institution course or an external exam subject, never both, and link back to canonical topics.

This design means adding a new institution only requires mapping its courses to existing canonical topics — no content duplication.

### AI Infrastructure

The AI features (OCR, grading, study assistant) use a hybrid approach evaluated through cost modeling. A Hostinger VPS handles OCR and lightweight inference locally, while conversational AI and complex grading route through the DeepSeek API. This hybrid model can serve 1,000+ students for approximately $100–130/month.

### Secondary School Support

The secondary school module is architecturally simpler than the university side. Nigerian secondary schools all follow the same NERDC national curriculum, so there is no institution-specific course mapping layer. A JSS2 student studying "Quadratic Equations" gets questions from Junior WAEC tagged to that topic. An SS3 student gets Senior WAEC, NECO, and GCE questions for the same canonical topic.
MD,
                    ],
                    [
                        'type' => SectionType::Lessons,
                        'title' => 'Lessons Learned',
                        'body' => <<<'MD'
### The Three-Layer Model Was Worth the Upfront Complexity

The temptation was to build a simpler system where questions just belong to courses at specific institutions. But that model breaks immediately when you want cross-institution question sharing or when a student transfers schools. Investing in the universal knowledge library as a separate, institution-agnostic layer made the entire system more flexible — even though it took longer to design.

### Content Is the Moat, Not Code

The technical architecture is important, but the real competitive advantage is having a comprehensive, well-tagged question bank. Technology is reproducible. A carefully curated library of thousands of past questions, each linked to canonical topics with verified answers and explanations, is not. This realization shifted development priority toward building robust content management and bulk import tools.

### Nigerian Education Is Not One System

"Nigerian university" is not a monolith. Federal universities, state universities, polytechnics, and colleges of education all have different structures, naming conventions, and academic calendars. The original schema used "university" everywhere — it had to be refactored to "institution" with type enums to properly represent the actual landscape.

### AI Cost Modeling Matters Early

The initial assumption was that self-hosting all AI models would be cheapest. Detailed cost modeling showed that a hybrid approach — local OCR plus API-based conversational AI — was both cheaper and more reliable than trying to run everything on a single VPS. Running the numbers before committing to infrastructure saved significant time and money.
MD,
                    ],
                ],
            ],
            [
                'slug' => 'batchdeliver',
                'title' => 'BatchDeliver',
                'tagline' => 'Zone-aware delivery logistics with batch optimization',
                'description' => 'A delivery-as-a-service platform that groups deliveries by geographic proximity, optimizes routes within batches, and integrates with ShelfWiser for end-to-end inventory-to-delivery pipelines.',
                'status' => ProjectStatus::InDevelopment,
                'is_featured' => true,
                'is_visible' => true,
                'sort_order' => 5,
                'technologies' => ['Laravel', 'Inertia.js', 'React', 'TypeScript', 'PostgreSQL'],
                'sections' => [
                    [
                        'type' => SectionType::Overview,
                        'title' => 'Overview',
                        'body' => <<<'MD'
BatchDeliver groups deliveries by geographic proximity and optimizes routes to reduce delivery time and cost for logistics operations.

### The Core Concept

Traditional dispatch assigns deliveries one at a time as they arrive. BatchDeliver takes a different approach: it collects orders within a configurable time window, clusters them by geographic zone, and dispatches optimized batches. A driver making 20 deliveries in the same zone spends 25–40% less time on the road compared to sequential random assignment.

### Key Capabilities

- **Zone-aware batch clustering** — groups nearby deliveries into efficient batches using geospatial algorithms
- **Dynamic pricing** — calculates delivery cost based on zone, distance, density, time window, and vehicle capacity across 12+ delivery zones
- **Route optimization** — calculates optimal delivery sequence within each batch
- **ShelfWiser integration** — direct pipeline from inventory to delivery, targeting sub-15-minute order-to-dispatch for e-commerce operations

### Target Users

E-commerce companies with their own delivery fleets, third-party logistics providers, and restaurant chains managing multi-location deliveries.
MD,
                    ],
                    [
                        'type' => SectionType::Architecture,
                        'title' => 'Architecture',
                        'body' => <<<'MD'
### Stack

Monolithic Laravel application with the same Inertia.js + React/TypeScript pattern used across the product suite.

### Geospatial Layer

PostgreSQL with PostGIS handles all geographic operations. Delivery zones are stored as polygons, and incoming orders are matched to zones using spatial containment queries. Batch clustering uses `ST_DWithin` for proximity searches with GIST indexes for performance.

### Batch Algorithm

The batching engine runs on a configurable schedule:

1. Collect all pending orders within the time window
2. Group by delivery zone (PostGIS polygon containment)
3. Within each zone, cluster by proximity using density-based spatial clustering
4. Assign clusters to available drivers based on capacity and location
5. Optimize route within each assigned batch

Route optimization uses nearest-neighbor initialization followed by 2-opt improvement passes, which runs in under 200ms for typical batch sizes of 15–25 stops.

### ShelfWiser Integration

For businesses using both platforms, an order confirmed in ShelfWiser can automatically trigger a delivery creation in BatchDeliver. The inventory deduction and delivery dispatch happen as a coordinated operation, eliminating the manual step of copying order details between systems.

### Event-Driven Architecture

The system uses Laravel events extensively. Stock confirmed events from ShelfWiser trigger delivery creation. Batch window closures trigger clustering. Driver assignments trigger route calculation. Each step is decoupled and processed asynchronously via Redis-backed queues.
MD,
                    ],
                    [
                        'type' => SectionType::Lessons,
                        'title' => 'Lessons Learned',
                        'body' => <<<'MD'
### Geospatial Queries Are a Different World

PostGIS is powerful but has a steep learning curve. Key discoveries: `ST_DWithin` is significantly faster than `ST_Distance` for proximity searches because it uses spatial indexes. SRID 4326 (WGS 84) is essential for GPS coordinates, but distance calculations need the `geography` type, not `geometry`. GIST indexing made a 50x difference on queries against large delivery point datasets.

### The Traveling Salesman Problem Is Genuinely Hard

Optimal route calculation for 20+ stops is NP-hard. The theoretical optimal solution is computationally infeasible in real-time. The hybrid approach of nearest-neighbor initialization plus iterative 2-opt swaps produces routes that are within 10–15% of optimal in under 200ms — good enough for practical use.

### Batch Window Tuning Is Business-Critical

Too short a window and batches are too small to be efficient. Too long and customers wait too long for their deliveries. The optimal window depends entirely on order volume and density, which varies by time of day and day of week. Making this configurable per zone was essential.
MD,
                    ],
                ],
            ],
            [
                'slug' => 'conflow',
                'title' => 'Conflow',
                'tagline' => 'Interactive visual programming education',
                'description' => 'A platform that teaches programming concepts through step-by-step visual simulations with animated data flows, code highlighting, and real-time system diagrams.',
                'status' => ProjectStatus::Research,
                'is_featured' => false,
                'is_visible' => true,
                'sort_order' => 6,
                'technologies' => ['React', 'TypeScript', 'Framer Motion', 'GSAP', 'Tailwind CSS'],
                'sections' => [
                    [
                        'type' => SectionType::Overview,
                        'title' => 'Overview',
                        'body' => <<<'MD'
Conflow teaches programming concepts through interactive, step-by-step visual simulations rather than static text or passive video.

### The Problem with Existing Resources

Most programming education is either text-heavy documentation that learners skim, or video tutorials that viewers watch passively. Neither format forces the learner to engage with *how* things work at a mechanical level. When a JavaScript developer says they "understand" the event loop, they often mean they've read about it — not that they can trace execution through the call stack, microtask queue, and macrotask queue step by step.

### How Conflow Works

Each concept page follows a text-first architecture:

1. **Written introduction** — context, motivation, and key terminology
2. **Interactive visualization** — a step-by-step simulation the learner controls
3. **Key takeaways** — summary of what the visualization demonstrated

The visualization is the core. Learners step forward and backward through execution, watching data move between system components in real time. Code lines highlight as they execute. Queue items animate in and out. State changes are visible and traceable.

### Working Prototypes

Two concept visualizations are functional:

- **JavaScript Event Loop** — 18 interactive steps showing code execution flowing through the call stack, microtask queue (Promises), and macrotask queue (setTimeout). Learners see exactly why `Promise.then` runs before `setTimeout` even when setTimeout has a 0ms delay.
- **Redis Caching** — 14 steps demonstrating cache-aside pattern, cache hits vs misses, TTL expiration, and cache invalidation strategies with animated data flow between application, cache, and database.

### Design Language

The visual identity follows a "Blackboard" aesthetic — dark backgrounds with warm scholarly tones, chalk-like annotations, and a design language that evokes focused study rather than gamification.
MD,
                    ],
                    [
                        'type' => SectionType::Architecture,
                        'title' => 'Architecture',
                        'body' => <<<'MD'
### Frontend-Only Architecture

Conflow is a pure React/TypeScript application. There is no backend — all visualization logic runs in the browser. Each concept is a self-contained module with its own step definitions, component layout, and animation sequences.

### Step-Based Orchestration

Each visualization is defined as a sequence of steps. A step contains:

- Which UI elements to highlight or animate
- Which code lines to mark as active
- What state changes occur in the simulated system
- What explanatory text to display

The step engine manages forward/backward navigation, ensuring animations play correctly in both directions.

### Conflow Engine (Research)

The current prototypes are hand-coded per concept. The Conflow Engine is a research effort to create a generic, JSON-driven rendering system that can produce diverse visualizations from configuration files rather than custom code.

The engine defines hybrid template types — queue-based, network-flow, pipeline, and side-by-side comparison — that cover approximately 80% of programming concepts generically. The target is 50+ concept modules without writing per-module custom rendering code.

### Animation Stack

Framer Motion handles component-level animations (enter/exit, layout shifts, state transitions). GSAP handles timeline-based sequences where multiple elements need precisely coordinated movement — like data flowing from one system component to another.
MD,
                    ],
                    [
                        'type' => SectionType::Lessons,
                        'title' => 'Lessons Learned',
                        'body' => <<<'MD'
### Text-First Beats Animation-First

Early prototypes jumped straight into the visualization with minimal written context. User testing showed that learners who read a brief introduction first performed significantly better at understanding what the visualization was showing. The text provides the mental framework; the visualization fills it with concrete mechanics.

### Bidirectional Stepping Is Harder Than It Looks

Playing animations forward is straightforward. Playing them backward — undoing state changes, reversing element positions, restoring previous highlights — requires every step to define both its forward and reverse effects. This doubled the complexity of step definitions but made the learning experience dramatically better, because learners naturally step back and forth to understand transitions.

### The Generic Engine Is the Hard Problem

Building two hand-coded visualizations took days each. The engine research is about whether those visualizations can be described in JSON and rendered generically. The answer so far is "mostly yes for common patterns, but edge cases require escape hatches." The 80/20 split — generic templates for common patterns, custom code for unusual ones — seems like the practical path.
MD,
                    ],
                ],
            ],
            [
                'slug' => 'verivote',
                'title' => 'VeriVote',
                'tagline' => 'Tamper-evident election security for Android',
                'description' => 'A research project exploring tamper-evident voting verification for Android, with hardware KeyStore access, biometric authentication, and cryptographic audit trail integrity.',
                'status' => ProjectStatus::Research,
                'is_featured' => false,
                'is_visible' => true,
                'sort_order' => 7,
                'technologies' => ['Kotlin', 'Android'],
                'sections' => [
                    [
                        'type' => SectionType::Overview,
                        'title' => 'Overview',
                        'body' => <<<'MD'
VeriVote is a research project exploring how mobile devices can provide tamper-evident voting verification for Nigerian elections.

### Research Questions

1. Can Android's hardware security features (KeyStore, biometric authentication) provide sufficient guarantees for election integrity?
2. What does a practical, accessible verification interface look like for voters with varying technical literacy?
3. How do you maintain an audit trail that is both transparent and resistant to tampering?

### Approach

The project explores a multi-layered security model:

- **Hardware KeyStore** — cryptographic keys stored in the device's secure hardware, inaccessible to the operating system
- **Biometric authentication** — fingerprint and face verification tied to voter identity
- **Paired accreditation** — a two-device verification protocol where both voter and election official must authenticate
- **Duress PINs** — alternate PINs that silently flag coerced voting without alerting the coercer
- **Multi-channel transmission** — vote data transmitted through multiple independent channels to prevent single-point interception

### Current Status

This is active research. The focus is on understanding the security architecture deeply before building — exploring threat models, studying existing election security literature, and prototyping individual security components in isolation.
MD,
                    ],
                    [
                        'type' => SectionType::Architecture,
                        'title' => 'Architecture',
                        'body' => <<<'MD'
### Android Security Stack

| Layer | Component | Purpose |
|-------|-----------|---------|
| Hardware | Android KeyStore | Tamper-resistant key storage |
| Biometric | BiometricPrompt API | Voter identity verification |
| Crypto | Android Security Library | Encryption, signing, hash chains |
| Network | Certificate pinning + multi-channel | Secure transmission |
| Audit | Append-only hash chain | Tamper-evident record keeping |

### Audit Trail Design

Every election action — accreditation, vote casting, transmission, receipt — generates a cryptographically signed log entry. These entries form a hash chain where each entry includes the hash of the previous entry. Any modification to a historical entry breaks the chain, making tampering detectable.

### Threat Model

The system assumes adversaries at multiple levels:

- **Device compromise** — rooted phones, modified firmware
- **Network interception** — man-in-the-middle attacks on vote transmission
- **Coercion** — voters forced to vote under duress
- **Insider threats** — compromised election officials

Each threat maps to specific countermeasures in the security architecture.

### Learning Path

This project also serves as a structured learning path for Android security development — a 10-project curriculum covering Kotlin fundamentals, Android Studio setup, KeyStore integration, biometric APIs, and security-focused application architecture.
MD,
                    ],
                ],
            ],
            [
                'slug' => 'mockprep',
                'title' => 'MockPrep',
                'tagline' => 'Open-source interview preparation platform',
                'description' => 'An open-source platform combining structured DSA practice, system design exercises, and AI-powered mock interviews as a self-hostable alternative to commercial interview prep tools.',
                'status' => ProjectStatus::Deferred,
                'is_featured' => false,
                'is_visible' => true,
                'sort_order' => 8,
                'technologies' => ['Laravel', 'Inertia.js', 'React', 'TypeScript', 'Tailwind CSS'],
                'sections' => [
                    [
                        'type' => SectionType::Overview,
                        'title' => 'Overview',
                        'body' => <<<'MD'
MockPrep is an open-source interview preparation platform that combines structured DSA (Data Structures and Algorithms) practice, system design exercises, and AI-powered mock interviews.

### What It Includes

- **50+ DSA problems** mapped to structured PHP learning phases, progressing from basic data structures through advanced algorithmic patterns
- **System design canvas** — a visual workspace for practicing system design interviews with component diagrams and trade-off analysis
- **AI mock interviews** — simulated technical interviews with AI-generated questions, follow-ups, and detailed feedback scoring

### Why Open Source

Commercial interview prep platforms (LeetCode, AlgoExpert) are expensive for developers in markets like Nigeria where the subscription cost can be a significant percentage of monthly income. MockPrep is self-hostable — anyone can deploy their own instance and customize the problem set for their team or community.

### Current Status

Development is currently deferred in favor of higher-priority production projects. The core DSA problem engine and AI interview simulation are functional. System design canvas and additional problem sets are planned for future development.
MD,
                    ],
                    [
                        'type' => SectionType::Architecture,
                        'title' => 'Architecture',
                        'body' => <<<'MD'
### Stack

Same Laravel + Inertia.js + React/TypeScript monolith pattern used across the product suite.

### Problem Engine

DSA problems are stored as structured data with metadata: difficulty, category, learning phase, hints, solution templates, and test cases. The practice interface includes a code editor with syntax highlighting, test runner output, and hint progression.

### AI Interview System

Mock interviews are powered by a conversation API with structured prompts:

- System prompts define the interviewer persona and evaluation criteria per interview track (frontend, backend, system design, behavioral)
- Conversation history is maintained for context continuity within a session
- Responses are evaluated against a structured rubric and scored on technical accuracy, communication clarity, and completeness
- Follow-up questions are generated based on the candidate's previous answers, simulating realistic interview dynamics

### Self-Hosting

The application is designed to run on a single server with no external service dependencies beyond a database. AI features require an API key for the chosen LLM provider, but the rest of the platform works without it.
MD,
                    ],
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
