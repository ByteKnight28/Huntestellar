# 🗺️ Huntestellar: The Ultimate Treasure Hunt Adventure! 💎

Embark on an epic quest with Huntestellar, a thrilling web-based treasure hunt game designed to challenge your wits and navigation skills! Built as a high-performance monorepo, this application offers a seamless and engaging experience for all treasure seekers.

## ✨ Features

*   **Interactive Gameplay:** Dive into a captivating treasure hunt experience.
*   **Real-time Leaderboard:** Compete with friends and see who can find the treasure first!
*   **Progress Tracking:** Your journey is saved, so you can pick up right where you left off.
*   **Scalable Architecture:** Built for performance and future expansions.

## 🚀 Tech Stack - Powering Your Adventure

Huntestellar is crafted with modern and robust technologies to ensure a smooth and dynamic user experience:

*   **Monorepo Management**: [Turborepo](https://turbo.build/repo) & [PNPM Workspaces](https://pnpm.io/workspaces) for efficient development and dependency management.
*   **Frontend Magic**: Developed with [React](https://react.dev/) and bundled with [Vite](https://vitejs.dev/) for a blazing-fast, responsive interface.
*   **Backend Intelligence**: Powered by [Google Cloud Functions](https://cloud.google.com/functions) (Node.js) to handle game logic, data, and user interactions securely.

## 🏗️ Project Structure - A Glimpse Under the Hood

Our monorepo is organized for clarity and maintainability:

*   `apps/`: Houses our essential backend services:
    *   `api-getGameData`: Manages the retrieval of all game-related data.
    *   `api-updateLeaderboard`: Handles updates to the global treasure hunt leaderboard.
    *   `api-updateProgress`: Tracks and saves each player's unique progress throughout the game.
*   `frontend/`: Contains the heart of the game, the main React application that brings the treasure hunt to life!

## 🏁 Getting Started - Your Journey Begins!

Ready to join the hunt? Follow these simple steps to get Huntestellar up and running on your local machine.

### Prerequisites

Before you begin, ensure you have these tools installed:

*   [Node.js](https://nodejs.org/) (Latest LTS version is highly recommended for optimal performance)
*   [PNPM](https://pnpm.io/) (Install globally via `npm install -g pnpm`)

### Installation

Clone the repository and install all necessary dependencies across all workspaces:

```bash
pnpm install
```

### Development

To start the development servers for both the frontend application and backend functions:

```bash
pnpm dev
```

### Build

Compile all applications for production deployment:

```bash
pnpm build
```

### Linting

Maintain code quality and catch errors early by running our comprehensive linting suite:

```bash
pnpm lint
```