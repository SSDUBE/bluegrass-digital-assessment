# Bluegrass Digital Medical Results App

A React Native mobile application for viewing medical test results. This app allows users to view their medical test results, including detailed specimen information and test statuses.

## Features

- View a list of test results with status indicators
- Detailed view of individual test results
- Color-coded status badges (Completed, Pending, Processing)
- Personalized welcome header
- Contact modal for reaching out to medical professionals

## Screenshots

*Screenshots will be added here*

## Technologies Used

- React Native
- TypeScript
- Redux for state management
- React Navigation for routing
- React Native Vector Icons for UI elements
- Custom Mulish font family for consistent typography

## Prerequisites

- Node.js (v18 or higher)
- Yarn package manager
- For iOS: macOS with Xcode installed
- For Android: Android Studio with SDK installed

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SSDUBE/bluegrass-digital-assessment.git
   cd bluegrass-digital-assessment
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Install iOS dependencies (macOS only):
   ```bash
   cd ios && pod install && cd ..
   ```

## Running the App

### Development Mode

1. Start the Metro bundler:
   ```bash
   yarn start
   ```

2. Run on iOS simulator (macOS only):
   ```bash
   yarn ios
   ```

3. Run on Android emulator or device:
   ```bash
   yarn android
   ```

## Project Structure

```
/src
  /components        # Reusable UI components
  /hooks             # Custom React hooks
  /navigation        # Navigation configuration
  /screens           # Screen components
  /services          # API and data services
  /store             # Redux store and slices
  /theme             # Theme configuration
  /types             # TypeScript type definitions
  /utils             # Utility functions
/assets
  /fonts             # Custom font files (Mulish family)
```

## Code Quality

This project uses ESLint and Prettier for code quality and formatting:

```bash
# Run linting
yarn lint

# Fix linting issues automatically
yarn lint:fix

# Format code with Prettier
yarn format
```

## Custom Fonts

The app uses the Mulish font family for consistent typography across platforms. The font files are included in the `/assets/fonts` directory and are properly configured for both iOS and Android.

## Vector Icons

The app uses react-native-vector-icons, specifically the FontAwesome icon set. Icons are properly configured for both iOS and Android platforms.

## License

[MIT License](LICENSE)
