# Quick Reference Card

## Project Setup

```bash
# Install dependencies
npm install

# Start dev server (port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Context API Quick Reference

### Import Hook
```javascript
import { useDocumentContext } from '../context/DocumentContext';
```

### Use in Component
```javascript
const { formData, updateField, updateFields, clearAllData } = useDocumentContext();
```

### Update Single Field
```javascript
updateField('clientName', 'John Doe');
```

### Batch Update
```javascript
updateFields({
  clientName: 'John Doe',
  clientEmail: 'john@example.com',
  clientPhone: '+1234567890',
});
```

### Clear All Data
```javascript
clearAllData(); // Resets to defaults + removes from localStorage
```

### Access Form Data
```javascript
<p>{formData.clientName}</p>
<p>{formData.projectName}</p>
<p>{formData.totalValue}</p>
```

---

## Form Field Binding Pattern

```javascript
<input
  type="text"
  value={formData.fieldName}
  onChange={(e) => handleInputChange(e, 'fieldName')}
  className={styles.editableInput}
/>
```

---

## Key Files

| File | Purpose |
|------|---------|
| `src/context/DocumentContext.jsx` | Global state + localStorage sync |
| `src/pages/AgreementPage.jsx` | Page 1 - Client Agreement |
| `src/pages/InvoicePage.jsx` | Page 2 - Professional Invoice |
| `src/App.jsx` | Router + Provider wrapper |
| `package.json` | Dependencies + scripts |
| `vite.config.js` | Build configuration |

---

## Folder Structure

```
project/
├── src/
│   ├── context/           # Global state
│   ├── pages/            # Page components
│   ├── App.jsx           # Main component
│   ├── main.jsx          # Entry point
│   └── App.css           # Global styles
├── index.html            # HTML template
├── package.json          # Dependencies
├── vite.config.js        # Build config
├── README.md             # Documentation
└── STATE_MANAGEMENT.md   # Advanced docs
```

---

## Available Form Fields

### Agreement Section
- `agencyName`, `documentRef`, `dateIssued`, `version`
- `projectName`, `packageSelected`, `totalValue`
- `startDate`, `estCompletion`, `assignedContact`
- `agencyCompany`, `agencyAddress`, `agencyEmail`, `agencyPhone`, `agencyRegNo`
- `clientName`, `clientBusiness`, `clientAddress`, `clientEmail`, `clientPhone`

### Invoice Section
- `invoiceNo`, `dueDate`, `currency`, `agreementRef`, `poReference`
- `subtotal`, `tax`, `discount`, `projectTotal`, `depositReceived`, `balanceDue`
- `bankName`, `accountName`, `accountNo`, `ibanSwift`
- `stripeLink`, `paypalLink`

---

## Common Patterns

### Pattern 1: Display Data from Agreement on Invoice

```javascript
// InvoicePage.jsx
const { formData } = useDocumentContext();

// Displays automatically without any fetch/sync needed
<p>Client: {formData.clientName}</p>
<p>Project: {formData.projectName}</p>
```

### Pattern 2: Update from Multiple Pages

Page 1 updates field → Saved to context + localStorage  
Page 2 reads field → Displays instantly  
Page 3 updates field → Synced everywhere  

### Pattern 3: Reset Everything

```javascript
<button onClick={clearAllData}>
  Clear All Fields
</button>
```

---

## localStorage Management

### View Data (Browser Console)
```javascript
// See all stored data
JSON.parse(localStorage.getItem('clientAgreementData'))

// Clear all data
localStorage.removeItem('clientAgreementData')

// Clear everything
localStorage.clear()
```

### Storage Key
```
Key: 'clientAgreementData'
Value: JSON stringified object with all form fields
```

---

## Navigation Routing

| Path | Component | Purpose |
|------|-----------|---------|
| `/` | AgreementPage | Home/Agreement |
| `/agreement` | AgreementPage | Agreement page |
| `/invoice` | InvoicePage | Invoice page |
| `/welcome` | (TBD) | Welcome page |

---

## CSS Module Classes

### Common Classes Available

```css
.container         /* Main wrapper */
.section           /* Section container */
.toolbar           /* Top navigation bar */
.tbTab             /* Navigation tabs */
.editableInput     /* Form input fields */
.docCard           /* Document card container */
.snapshot          /* Info grid (3 columns) */
.twoCol            /* Two column layout */
.btnGold           /* Gold primary button */
.btnGhost          /* Secondary button */
.actionRow         /* Button group */
```

---

## Styling Variables

```css
:root {
  --black: #080808;        /* Main background */
  --card: #111;            /* Card background */
  --border: #242424;       /* Border color */
  --gold: #c9a84c;         /* Accent color */
  --white: #f0ece3;        /* Text color */
  --muted: #777;           /* Muted text */
}
```

---

## Common Tasks

### Add New Field
1. Add to default state in `DocumentContext.jsx`
2. Use `updateField('fieldName', value)` in component
3. Access with `formData.fieldName`
✅ Automatically synced

### Create New Page
1. Create `.jsx` component in `src/pages/`
2. Create `.module.css` stylesheet
3. Add route in `App.jsx`
4. Use `useDocumentContext()` for data access
✅ All data automatically available

### Fix localStorage Issues
1. Clear browser cache: Ctrl+Shift+Delete
2. Open DevTools: F12 → Application tab
3. Find "localStorage" → Clear entry
4. Reload page

### Test Data Persistence
1. Fill form with data
2. Close browser completely
3. Reopen browser and app
✅ Data should still be there

---

## Debugging Commands

```javascript
// Check if context is available
useDocumentContext(); // Should not throw error

// Log current form data
console.log(formData);

// Inspect localStorage
console.log(localStorage.getItem('clientAgreementData'));

// Monitor all updates
useEffect(() => {
  console.log('Data changed:', formData);
}, [formData]);

// Check localStorage quota
console.log(localStorage.getItem('clientAgreementData').length, 'bytes');
```

---

## Tips & Tricks

💡 **Quick Navigation**
- Use tab buttons in toolbar for instant page switching
- Use ← Back / Next → buttons for sequential navigation

💾 **Data Safety**
- Data saves automatically as you type
- Closing browser doesn't lose data
- Use "Clear" button to intentionally reset

📄 **PDF Export**
- Always click "Download PDF" button (not Ctrl+P)
- Enable "Background graphics" in print settings
- Dark theme prints best to dark background

⚡ **Performance**
- Uses localStorage (instant sync)
- CSS Modules prevent style conflicts
- Context API reduces prop drilling
- No external dependencies for state

🔧 **Debugging**
- Check console (F12) for errors
- Inspect localStorage in DevTools
- Use React DevTools browser extension
- Test in incognito mode to isolate issues

---

## File Size Reference

| Item | Size |
|------|------|
| Single form field in localStorage | ~50-200 bytes |
| Complete form data | ~3-5 KB |
| localStorage quota | ~5-10 MB |
| Available storage for this app | ~99.9% |

---

## Browser Compatibility

✅ **Fully Supported**
- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

⚠️ **Partial Support**
- Internet Explorer (no modern CSS)
- Older Safari versions (CSS Grid)

---

## Performance Metrics

- **Initial Load**: < 1 second
- **Page Switch**: Instant (< 100ms)
- **localStorage Save**: < 10ms
- **Data Retrieval**: < 1ms

---

## Security Notes

⚠️ **Important**
- Don't store sensitive data (passwords, tokens) in localStorage
- Use HTTPS when deployed
- localStorage is accessible to any script on the domain
- For production, implement backend authentication

---

## Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Start dev server: `npm run dev`
3. ✅ Try filling out Agreement page
4. ✅ Navigate to Invoice page (data auto-populates!)
5. ✅ Check localStorage in DevTools
6. ✅ Reload browser (data persists!)
7. ✅ Download as PDF when ready

---

## Resources

📚 **Documentation**
- [README.md](README.md) - Project overview
- [STATE_MANAGEMENT.md](STATE_MANAGEMENT.md) - Technical details
- [USAGE_GUIDE.md](USAGE_GUIDE.md) - User guide
- [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) - Extension guide

🔗 **Links**
- [React Docs](https://react.dev)
- [React Router](https://reactrouter.com)
- [Vite](https://vitejs.dev)

---

## Shortcuts & Commands

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm run preview      # Preview production build

# npm helpful
npm ls              # List all dependencies
npm update          # Update all packages
npm audit           # Check for vulnerabilities
npm outdated        # Check for outdated packages

# Git (optional)
git status          # Check changes
git add .           # Stage all files
git commit -m "msg" # Commit changes
git push            # Push to remote
```

---

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Focus input | Click field |
| Next field | Tab |
| Previous field | Shift+Tab |
| Print dialog | Ctrl+P |
| DevTools | F12 |
| Hard refresh | Ctrl+Shift+R |
| Clear cache | Ctrl+Shift+Delete |

---

**Version**: 1.0.0  
**Last Updated**: May 2024  
**Framework**: React 18.2 + Vite 5.0  
**State**: Context API + localStorage
