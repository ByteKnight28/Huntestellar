# Treasure_Hunt_2025

A web application for a treasure hunt game, built as a monorepo.

## Tech Stack

-   **Monorepo**: [Turborepo](https://turbo.build/repo), [PNPM Workspaces](https://pnpm.io/workspaces)
-   **Frontend**: [React](https://react.dev/), [Vite](https://vitejs.dev/)
-   **Backend**: [Google Cloud Functions](https://cloud.google.com/functions) (Node.js)

## Project Structure

-   `apps/`: Contains backend services.
    -   `api-getGameData`: Service to retrieve game data.
    -   `api-updateLeaderboard`: Service to update the leaderboard.
    -   `api-updateProgress`: Service to track player progress.
-   `frontend/`: The main React application for the treasure hunt interface.

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (Latest LTS recommended)
-   [PNPM](https://pnpm.io/) (`npm install -g pnpm`)

### Installation

Install dependencies for all workspaces:

```bash
pnpm install
```

### Development

Run the development server for all apps (frontend and backend functions):

```bash
pnpm dev
```

### Build

Build all applications:

```bash
pnpm build
```

### Linting

Run linting across the monorepo:

```bash
pnpm lint
```