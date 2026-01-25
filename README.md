🍳 RecipeApp 2026

A modern, full-stack PWA for scraping, categorizing, and managing recipes. Designed for high performance and ease of use.
📂 Project Structure

    /frontend: React + Vite + Tailwind CSS v4. Operates as a PWA with offline capabilities.

    /backend: Node.js + Express + Prisma. Handles API requests and database management.

    /python-scraper: Python 3 worker. Uses recipe-scrapers to extract data from URLs.

🚀 Quick Start
1. Backend & Database

    Navigate to /backend.

    Install dependencies: npm install.

    Set up your .env file with your PostgreSQL connection string.

    Sync the database:
    Bash

    npx prisma migrate dev

    Start the server: npm run dev.

2. Python Scraper (The Worker)

The backend calls this script directly. It must have its virtual environment configured.

    Navigate to /python-scraper.

    Create venv: python3 -m venv venv.

    Activate & Install:
    Bash

    # Mac/Linux
    source venv/bin/activate
    pip install recipe-scrapers

    Note: Ensure the path in backend/src/services/scraper.ts matches your local venv path.

3. Frontend (PWA)

    Navigate to /frontend.

    Install dependencies: npm install.

    Start dev server: npm run dev.

    Build for PWA testing: npm run build.

🛠 Tech Stack

    Frontend: React, Tailwind CSS v4 (using @theme variables), Lucide React (Icons).

    Backend: TypeScript, Express, Prisma ORM.

    Database: PostgreSQL.

    Scraper: Python 3.11+, recipe-scrapers library.

    Fonts: LINE Seed JP (UI), Dancing Script (Display/Headers).

📝 Key Commands Reference
|     Action    |                 Command                 |   Folder  |
|---------------|-----------------------------------------|-----------|
|Reset Database	| `npx prisma migrate reset`            	|`/backend` |
|Prisma Studio	| `npx prisma studio`	                    |`/backend` |
|New Migration	| `npx prisma migrate dev --name <name>`	|`/backend` |
|Build PWA	    | `npm run build`                        	|`/frontend`|

⚠️ Troubleshooting

    Fonts not showing? Restart the Vite dev server to re-scan Tailwind CSS variables.

    PWA Warning? If you see a glob pattern warning in dev, ignore it or run a build to generate the dev-dist folder.

    Scraper Error? Ensure the Python venv is populated and that you are not passing the deprecated wild_mode argument to scrape_me().

🎨 Design System

    Headers: font-display (Dancing Script)

    Body: font-line (LINE Seed JP)