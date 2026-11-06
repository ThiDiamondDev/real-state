# Real Estate Mobile App Template — Expo SDK 58 Boilerplate

A Real Estate mobile application template built using **Expo SDK 58**, **React Native 0.88**, and **React Native Paper**.

This project is open-source, highly permissive, and designed to function as an out-of-the-box template for developer projects.

## 📱 App Screenshots

|                                                                                        |                                                                                        |                                                                                        |                                                                                        |
| :------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: |
| <img src="./AppScreenshots/AppScreenshot (1).jpeg" width="180" title="Screenshot 1" /> | <img src="./AppScreenshots/AppScreenshot (2).jpeg" width="180" title="Screenshot 2" /> | <img src="./AppScreenshots/AppScreenshot (3).jpeg" width="180" title="Screenshot 3" /> | <img src="./AppScreenshots/AppScreenshot (4).jpeg" width="180" title="Screenshot 4" /> |
|                                    **Screenshot 1**                                    |                                    **Screenshot 2**                                    |                                    **Screenshot 3**                                    |                                    **Screenshot 4**                                    |
| <img src="./AppScreenshots/AppScreenshot (5).jpeg" width="180" title="Screenshot 5" /> | <img src="./AppScreenshots/AppScreenshot (6).jpeg" width="180" title="Screenshot 6" /> | <img src="./AppScreenshots/AppScreenshot (7).jpeg" width="180" title="Screenshot 7" /> | <img src="./AppScreenshots/AppScreenshot (8).jpeg" width="180" title="Screenshot 8" /> |
|                                    **Screenshot 5**                                    |                                    **Screenshot 6**                                    |                                    **Screenshot 7**                                    |                                    **Screenshot 8**                                    |

## 🛠️ Project Directory Tree Structure

```text
src/
├── app/
│   ├── _layout.tsx         # Universal Root Stack Layout (Theme, Layout Providers)
│   ├── (drawer)/           # Nested Layout Subgroup Directory
│   │   ├── _layout.tsx     # Custom Sidebar Menu Configuration Shell
│   │   ├── index.tsx       # Home Core Display Screen Panel
│   │   ├── About.tsx       # Corporate Information Viewsheet
│   │   ├── Explore.tsx     # Property Discovery and Category Listing Grid
│   │   └── Favorites.tsx   # Saved Preferences Storage Panel
│   └── property/
│       └── [id].tsx        # Standalone Dynamic Property Details Display Screen
├── contexts/
│   └── LanguageContext.tsx # Translation State Context Shell
└── data/
    └── translations.ts     # Localization Dictionary Source Dataset
```

## 💻 Local Installation and Setup

Follow these standard steps to set up and run the template locally:

### 1. Navigate to the Project

Open your terminal and enter the project folder:

```bash
cd real-state
```

### 2. Install Dependencies

Install the required packages cleanly using your preferred package manager:

```bash
npm install
```

### 3. Start the Development Server

Launch the universal Metro bundler server to start coding:

```bash
npx expo start
```

## 📱 Launching on Devices

Once your terminal UI active server boots, map your viewport workspace panel instantly:

- Press **`A`** to stream the workspace environment onto a connected Android Emulator or Physical Device running the Expo Go App.
- Press **`I`** to initialize your view layers directly inside an iOS Simulating workspace panel.
- Press **`M`** to toggle your local Dev Menu options explicitly from your workstation shell.

## 📄 License

This boilerplate template project is completely distributed under the terms of the **MIT License**. You are free to copy, modify, distribute, sell, or sub-license the codebase across personal, professional, or commercial applications with **zero requirements to provide attribution or credit** to the original author.
