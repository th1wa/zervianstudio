# Developer Guide - Extending the Application

This guide explains how to extend the Client Agreement application with new pages, fields, and features.

## Table of Contents

1. [Adding New Pages](#adding-new-pages)
2. [Adding Form Fields](#adding-form-fields)
3. [Custom Styling](#custom-styling)
4. [Navigation Changes](#navigation-changes)
5. [Advanced Features](#advanced-features)
6. [Testing](#testing)
7. [Performance Optimization](#performance-optimization)

---

## Adding New Pages

### Step 1: Create New Page Component

Create `src/pages/WelcomePage.jsx`:

```javascript
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocumentContext } from '../context/DocumentContext';
import styles from './WelcomePage.module.css';

const WelcomePage = () => {
  const navigate = useNavigate();
  const { formData, updateField } = useDocumentContext();

  return (
    <div className={styles.container}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.tbBrand}>WD Documents</div>
        <div className={styles.tbTabs}>
          <button className={styles.tbTab} onClick={() => navigate('/agreement')}>
            01 — Agreement
          </button>
          <button className={styles.tbTab} onClick={() => navigate('/invoice')}>
            02 — Invoice
          </button>
          <button className={`${styles.tbTab} ${styles.active}`}>
            03 — Welcome
          </button>
        </div>
        <div className={styles.tbActions}>
          <button className={`${styles.tbBtn} ${styles.gold}`} onClick={() => window.print()}>
            ↓ Download PDF
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={styles.section}>
        <div className={styles.container_inner}>
          <h1>Welcome Page Content</h1>
          {/* Your welcome page content here */}
          
          {/* Access auto-populated data */}
          <p>Client Name: {formData.clientName}</p>
          <p>Project: {formData.projectName}</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
```

### Step 2: Create Stylesheet

Create `src/pages/WelcomePage.module.css` (copy from InvoicePage.module.css as base):

```css
/* Import the same base styles */
:root {
  --black: #080808;
  --card: #111;
  /* ... other variables ... */
}

.container {
  background: var(--black);
  color: var(--white);
  /* ... rest of styles ... */
}

/* Add custom styles for welcome page */
```

### Step 3: Add Route to App.jsx

Update `src/App.jsx`:

```javascript
import WelcomePage from './pages/WelcomePage';

function App() {
  return (
    <DocumentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AgreementPage />} />
          <Route path="/agreement" element={<AgreementPage />} />
          <Route path="/invoice" element={<InvoicePage />} />
          <Route path="/welcome" element={<WelcomePage />} />  {/* Add this */}
        </Routes>
      </Router>
    </DocumentProvider>
  );
}
```

### Step 4: Test Navigation

1. Run `npm run dev`
2. Click on "03 — Welcome" tab
3. Verify page loads and displays data from other pages

---

## Adding Form Fields

### Scenario: Add "Revision Rounds" Field

### Step 1: Update DocumentContext

Edit `src/context/DocumentContext.jsx`:

```javascript
const [formData, setFormData] = useState({
  // ... existing fields ...
  
  // Add new field with default value
  revisionRounds: '3',
  completionTimeline: '30 days',
  supportPeriod: '30 days',
});
```

### Step 2: Use in Component

Edit `src/pages/AgreementPage.jsx`:

```javascript
<div className={styles.fieldRow}>
  <span className={styles.fl}>Revision Rounds</span>
  <input
    type="text"
    value={formData.revisionRounds}
    onChange={(e) => handleInputChange(e, 'revisionRounds')}
    className={styles.editableInput}
  />
</div>
```

### Step 3: Access in Other Pages

In any component using `useDocumentContext()`:

```javascript
const { formData } = useDocumentContext();

// Field automatically contains the value
console.log(formData.revisionRounds); // '3'

// Display it
<p>Revision Rounds: {formData.revisionRounds}</p>
```

### Step 4: Automatic Persistence

✅ No additional code needed! Field automatically:
- Saves to localStorage on change
- Loads from localStorage on app startup
- Syncs across all pages

---

## Custom Styling

### Modify Theme Colors

Edit `:root` variables in any `.module.css`:

```css
:root {
  --black: #0a0a0a;        /* Darker background */
  --gold: #d4af37;         /* Brighter gold */
  --gold2: #ffd700;        /* Lighter gold */
  --white: #ffffff;        /* Pure white text */
  /* ... others ... */
}
```

### Create Reusable Component Styles

Create `src/styles/shared.module.css`:

```css
.buttonPrimary {
  background: var(--gold);
  color: var(--black);
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.buttonPrimary:hover {
  background: var(--gold2);
  transform: translateY(-2px);
}
```

Import and use:

```javascript
import sharedStyles from '../styles/shared.module.css';

<button className={sharedStyles.buttonPrimary}>
  Click Me
</button>
```

### Dark/Light Theme Toggle

Add theme context:

```javascript
// src/context/ThemeContext.jsx
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
  
  const toggleTheme = () => setIsDark(!isDark);
  
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
```

Use in component:

```javascript
const { isDark, toggleTheme } = useTheme();

<button onClick={toggleTheme}>
  {isDark ? '☀️ Light' : '🌙 Dark'}
</button>
```

---

## Navigation Changes

### Add More Tabs to Toolbar

Edit component to add more navigation:

```javascript
<div className={styles.tbTabs}>
  <button className={styles.tbTab} onClick={() => navigate('/agreement')}>
    01 — Agreement
  </button>
  <button className={styles.tbTab} onClick={() => navigate('/invoice')}>
    02 — Invoice
  </button>
  <button className={styles.tbTab} onClick={() => navigate('/welcome')}>
    03 — Welcome
  </button>
  <button className={styles.tbTab} onClick={() => navigate('/schedule')}>
    04 — Schedule
  </button>
  <button className={styles.tbTab} onClick={() => navigate('/terms')}>
    05 — Terms
  </button>
</div>
```

### Create Breadcrumb Navigation

Create `src/components/Breadcrumb.jsx`:

```javascript
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Breadcrumb.module.css';

export const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const pages = {
    '/agreement': 'Agreement',
    '/invoice': 'Invoice',
    '/welcome': 'Welcome',
  };
  
  return (
    <div className={styles.breadcrumb}>
      <a onClick={() => navigate('/')}>Home</a>
      {' > '}
      <span>{pages[location.pathname] || 'Page'}</span>
    </div>
  );
};
```

---

## Advanced Features

### 1. Email Integration

Create `src/services/emailService.js`:

```javascript
export const sendEmail = async (data) => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: data.clientEmail,
        subject: `Agreement: ${data.projectName}`,
        html: generateEmailHTML(data),
      }),
    });
    return response.json();
  } catch (error) {
    console.error('Email send failed:', error);
  }
};

function generateEmailHTML(data) {
  return `
    <h1>Project Agreement</h1>
    <p>Hello ${data.clientName},</p>
    <p>Here is your agreement for project: ${data.projectName}</p>
    <!-- More HTML content -->
  `;
}
```

Use in component:

```javascript
import { sendEmail } from '../services/emailService';

const handleSendEmail = async () => {
  await sendEmail(formData);
  alert('Email sent successfully!');
};

<button onClick={handleSendEmail}>
  📧 Send to Client
</button>
```

### 2. Signature Capture

Install signature library:

```bash
npm install react-signature-canvas
```

Create `src/components/SignaturePad.jsx`:

```javascript
import SignatureCanvas from 'react-signature-canvas';
import { useRef } from 'react';

export const SignaturePad = ({ onSave }) => {
  const signatureRef = useRef();
  
  const handleSave = () => {
    const signatureImage = signatureRef.current.getTrimmedCanvas().toDataURL('image/png');
    onSave(signatureImage);
  };
  
  return (
    <div>
      <SignatureCanvas
        ref={signatureRef}
        canvasProps={{ width: 500, height: 200 }}
      />
      <button onClick={handleSave}>Save Signature</button>
    </div>
  );
};
```

### 3. Multi-Language Support

Create `src/i18n/translations.js`:

```javascript
export const translations = {
  en: {
    agencyName: 'Your Agency Name',
    clientName: 'Client Name',
    projectName: 'Project Name',
    // ... more translations
  },
  es: {
    agencyName: 'Nombre de su Agencia',
    clientName: 'Nombre del Cliente',
    projectName: 'Nombre del Proyecto',
    // ... more translations
  },
};
```

Use with language context:

```javascript
export const useLanguage = () => {
  const [language, setLanguage] = useState('en');
  
  const t = (key) => translations[language][key] || key;
  
  return { language, setLanguage, t };
};
```

### 4. Template System

Create `src/templates/templateService.js`:

```javascript
export const templates = {
  standard: {
    agencyName: 'Your Agency Name',
    revisionRounds: '3',
    supportPeriod: '30 days',
  },
  premium: {
    agencyName: 'Your Agency Name',
    revisionRounds: '5',
    supportPeriod: '60 days',
  },
  basic: {
    agencyName: 'Your Agency Name',
    revisionRounds: '1',
    supportPeriod: '14 days',
  },
};

export const applyTemplate = (templateName, updateFields) => {
  if (templates[templateName]) {
    updateFields(templates[templateName]);
  }
};
```

---

## Testing

### Unit Testing with Vitest

Create `src/__tests__/DocumentContext.test.jsx`:

```javascript
import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { DocumentProvider, useDocumentContext } from '../context/DocumentContext';

describe('DocumentContext', () => {
  it('should initialize with default values', () => {
    const TestComponent = () => {
      const { formData } = useDocumentContext();
      return <div>{formData.agencyName}</div>;
    };
    
    const { getByText } = render(
      <DocumentProvider>
        <TestComponent />
      </DocumentProvider>
    );
    
    expect(getByText('Your Agency Name')).toBeInTheDocument();
  });
  
  it('should update field values', () => {
    // Test updateField function
  });
  
  it('should persist to localStorage', () => {
    // Test localStorage sync
  });
});
```

### Integration Testing

Create `src/__tests__/DataSync.test.jsx`:

```javascript
describe('Data Synchronization', () => {
  it('should sync data between pages', () => {
    // Test data flows from Agreement to Invoice page
  });
  
  it('should persist data across browser sessions', () => {
    // Simulate page reload
    // Verify data is restored
  });
});
```

Run tests:

```bash
npm install -D vitest @testing-library/react
npm run test
```

---

## Performance Optimization

### 1. Code Splitting with React.lazy

```javascript
import { lazy, Suspense } from 'react';
import { useRouteLoading } from 'react-router-dom';

const AgreementPage = lazy(() => import('./pages/AgreementPage'));
const InvoicePage = lazy(() => import('./pages/InvoicePage'));
const WelcomePage = lazy(() => import('./pages/WelcomePage'));

function App() {
  return (
    <DocumentProvider>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/agreement" element={<AgreementPage />} />
            <Route path="/invoice" element={<InvoicePage />} />
            <Route path="/welcome" element={<WelcomePage />} />
          </Routes>
        </Suspense>
      </Router>
    </DocumentProvider>
  );
}
```

### 2. Memoization

```javascript
import { memo } from 'react';

const InvoiceLineItems = memo(({ items }) => {
  return (
    <table>
      {items.map(item => (
        <tr key={item.id}>
          <td>{item.description}</td>
          <td>{item.amount}</td>
        </tr>
      ))}
    </table>
  );
}, (prevProps, nextProps) => {
  // Only re-render if items actually changed
  return prevProps.items === nextProps.items;
});
```

### 3. Debounce localStorage Saves

```javascript
import { debounce } from 'lodash-es';

const debouncedSave = debounce((data) => {
  localStorage.setItem('clientAgreementData', JSON.stringify(data));
}, 1000);

useEffect(() => {
  debouncedSave(formData);
}, [formData]);
```

### 4. Optimize Re-renders

```javascript
// Bad: Re-renders entire table on any change
const DocumentTable = ({ data }) => (
  <table>
    {data.map(row => <TableRow key={row.id} {...row} />)}
  </table>
);

// Good: Only affected row re-renders
const TableRow = memo(({ id, name, amount }) => (
  <tr>
    <td>{name}</td>
    <td>{amount}</td>
  </tr>
));
```

---

## Project Structure After Extensions

```
src/
├── components/
│   ├── Breadcrumb.jsx
│   └── SignaturePad.jsx
├── context/
│   ├── DocumentContext.jsx
│   └── ThemeContext.jsx
├── pages/
│   ├── AgreementPage.jsx
│   ├── AgreementPage.module.css
│   ├── InvoicePage.jsx
│   ├── InvoicePage.module.css
│   ├── WelcomePage.jsx
│   └── WelcomePage.module.css
├── services/
│   ├── emailService.js
│   ├── documentApi.js
│   └── templateService.js
├── styles/
│   └── shared.module.css
├── i18n/
│   └── translations.js
├── __tests__/
│   ├── DocumentContext.test.jsx
│   └── DataSync.test.jsx
├── App.jsx
├── App.css
└── main.jsx
```

---

## Common Pitfalls

### ❌ Don't: Mutate State Directly

```javascript
// WRONG
formData.clientName = 'John'; // Mutates original object

// CORRECT
updateField('clientName', 'John'); // Uses proper state setter
```

### ❌ Don't: Store Complex Objects Without Serialization

```javascript
// WRONG
localStorage.setItem('data', formData); // Saves "[object Object]"

// CORRECT
localStorage.setItem('data', JSON.stringify(formData));
```

### ❌ Don't: Forget Dependencies in useEffect

```javascript
// WRONG
useEffect(() => {
  localStorage.setItem('data', JSON.stringify(formData));
}); // Runs on EVERY render

// CORRECT
useEffect(() => {
  localStorage.setItem('data', JSON.stringify(formData));
}, [formData]); // Only runs when formData changes
```

### ❌ Don't: Use useContext Outside Provider

```javascript
// WRONG - Won't work
const value = useDocumentContext(); // Error: used outside provider

// CORRECT
// Make sure DocumentProvider wraps component tree in App.jsx
```

---

## Helpful Resources

- [React Documentation](https://react.dev)
- [React Router v6 Docs](https://reactrouter.com)
- [Vite Guide](https://vitejs.dev/guide/)
- [CSS Modules Guide](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/)

---

**Version**: 1.0.0  
**Last Updated**: May 2024
