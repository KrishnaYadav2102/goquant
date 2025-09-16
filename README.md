# 🚀 GoQuant: Buggy Cars Playwright Automation Suite

### This repository contains automated tests for the application Buggy Cars Rating
### The project is built with Playwright, TypeScript, and follows the Page Object Model (POM) design pattern.

---
## 📂 Project Structure
```bash
goquant
│
│──e2e/
│   │── pages/                # Page Object classes
│   │   ├── BasePage.ts
│   │   ├── HomePage.ts
│   │   ├── LoginPage.ts
│   │   ├── ProfilePage.ts
│   │   └── RegisterPage.ts
│   │
│   │── tests/                # Test specifications
│   │   ├── login.spec.ts
│   │   ├── profile.spec.ts
│   │   └── register.spec.ts
│   │
│   │── test-data/            # Test data files
│   │   └── registration.json
│   │
│   │── utils/                # Utilities & helpers
│   │   ├── constants.ts
│   │   └── helpers.ts
│   │
│   │── playwright.config.ts  # Playwright configuration
│   │── eslint.config.js      # ESLint configuration (ESLint 9 flat config)
│   │── package.json
│   │── playwright.config.ts  # Playwright configuration
│   └── tsconfig.json         # TypeScript configuration
│
└── README.md
```
---
## 🛠 Prerequisites
- Node.js v18+ (Playwright requires ≥16, v18 recommended)
- npm or yarn
---
# ⚙️ Setup

### Clone the repository:

```git clone https://github.com/<your-repo>/buggy-cars-playwright.git
cd goquant/e2e
```

### Install dependencies:

```
npm install
```

Install Playwright browsers:
```
npx playwright install
```
---
# ▶️ Running Tests
### Run all tests (default browser: Chromium)
```
npx playwright test
```
### Run tests in all browsers (Chromium, Firefox, WebKit)
```
npx playwright test --project=all
```
### Run a specific test file
```
npx playwright test tests/auth.spec.ts
```
### Run with UI mode (debugging)
```
npx playwright test --ui
```
---
# 📊 Reporting
### Generate an HTML report:
```
npx playwright show-report
```

### Reports are stored in:
```
playwright-report/
```
---
# 🧹 Code Quality
### Linting with ESLint:
```
npm run lint
```

### Auto-fix issues:
```
npm run lint:fix
```

### Format with Prettier:
```
npm run format:fix
```
---
# 📄 Features Covered
✅ User Registration (positive & negative scenarios, data-driven via JSON)

✅ Login / Logout

✅ Profile updates & password change

✅ Loader handling (smart waits in BasePage)

✅ Cross-browser testing (Chromium, Firefox, WebKit)
