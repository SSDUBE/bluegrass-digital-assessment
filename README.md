# Bluegrass Digital Expo App

This is a React Native application built with Expo that displays medical test results.

## Features

- List view of test results
- Detailed view of individual test results
- Contact modal for reaching doctors
- Redux state management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npx expo start
```

## Project Structure

- `app/` - Contains all the screens and navigation using Expo Router
- `components/` - Reusable UI components
- `hooks/` - Custom React hooks
- `store/` - Redux store configuration and slices
- `services/` - API services
- `theme/` - Theme configuration
- `types/` - TypeScript type definitions
- `utils/` - Utility functions

## Navigation

This project uses Expo Router for navigation:

- `/` - Redirects to the results listing screen
- `/results` - The main results listing screen
- `/result/[id]` - Dynamic route for viewing result details
