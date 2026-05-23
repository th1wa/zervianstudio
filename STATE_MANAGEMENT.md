# Global State Management Implementation Guide

## Overview

This document explains how the data synchronization system works across the Client Agreement application.

## Architecture

### Three-Layer Approach

```
┌─────────────────────────────────────────────┐
│         React Components                    │
│    (AgreementPage, InvoicePage, etc.)      │
└──────────────────┬──────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────┐
│     DocumentContext (Context API)           │
│   - Global state management                │
│   - updateField() & updateFields()          │
│   - clearAllData()                          │
└──────────────────┬──────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────┐
│     Browser localStorage                    │
│   - Persistent data storage                │
│   - Auto-saved on state changes            │
└─────────────────────────────────────────────┘
```

## DocumentContext Implementation

### 1. Context Creation

```javascript
const DocumentContext = createContext();
```

Creates a React Context object to hold and provide global state.

### 2. Custom Hook

```javascript
export const useDocumentContext = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocumentContext must be used within DocumentProvider');
  }
  return context;
};
```

This hook provides:
- Convenient access to context anywhere in the app
- Error checking to prevent usage outside of Provider
- Type safety and better IDE autocomplete

### 3. Provider Component

```javascript
export const DocumentProvider = ({ children }) => {
  const [formData, setFormData] = useState({...});
  
  // Load from localStorage on mount
  useEffect(() => { ... }, []);
  
  // Save to localStorage on change
  useEffect(() => { ... }, [formData]);
  
  const updateField = (fieldName, value) => { ... };
  const updateFields = (updates) => { ... };
  const clearAllData = () => { ... };
  
  return (
    <DocumentContext.Provider value={...}>
      {children}
    </DocumentContext.Provider>
  );
};
```

**Key features:**
- Wraps entire application
- Manages state with `useState`
- Syncs data with localStorage
- Provides update methods

## Data Flow Example

### When User Types in Agreement Page

```
User types → onChange event fires
            ↓
updateField('clientName', 'John Doe')
            ↓
setFormData updates React state
            ↓
useEffect detects change
            ↓
localStorage.setItem('clientAgreementData', JSON.stringify(formData))
            ↓
Invoice page accesses formData.clientName
            ↓
Invoice page automatically shows "John Doe"
```

### Persistence Across Sessions

```
Session 1:
  User fills form → Data saved to localStorage
                 ↓
  Browser closes
                 ↓
Session 2:
  App loads → useEffect runs
           ↓
  localStorage.getItem('clientAgreementData')
           ↓
  formData restored → Components re-render with data
```

## Core Functions

### updateField(fieldName, value)

Updates a single form field:

```javascript
updateField('clientName', 'John Doe');
```

**Process:**
1. Creates new formData object with updated field
2. Sets state (triggers React re-render)
3. useEffect automatically saves to localStorage

**Usage in Components:**

```javascript
<input
  value={formData.clientName}
  onChange={(e) => updateField('clientName', e.target.value)}
/>
```

### updateFields(updates)

Batch update multiple fields:

```javascript
updateFields({
  clientName: 'John Doe',
  clientEmail: 'john@example.com',
  clientPhone: '+1234567890'
});
```

**Advantage:** Reduces number of state updates and localStorage writes

### clearAllData()

Resets all fields to defaults:

```javascript
clearAllData();
```

**Process:**
1. Resets formData to initial defaults
2. Removes data from localStorage
3. Confirms with user before clearing

## localStorage Structure

Data is stored as a single JSON object:

```javascript
// Key: 'clientAgreementData'
{
  "agencyName": "Your Agency Name",
  "documentRef": "AGR-001",
  "dateIssued": "DD / MM / YYYY",
  "projectName": "Project Name",
  "clientName": "Client Full Name",
  "clientEmail": "client@email.com",
  // ... all other fields
}
```

**Storage Limit:** ~5-10MB per origin (browser dependent)

## Integration with Components

### Step 1: Import Hook

```javascript
import { useDocumentContext } from '../context/DocumentContext';
```

### Step 2: Access in Component

```javascript
function AgreementPage() {
  const { formData, updateField, clearAllData } = useDocumentContext();
  
  // Use formData and update methods
}
```

### Step 3: Bind to Inputs

```javascript
<input
  value={formData.clientName}
  onChange={(e) => updateField('clientName', e.target.value)}
  className={styles.editableInput}
/>
```

## Performance Considerations

### Optimization Strategies

1. **Batching Updates**
   ```javascript
   // ❌ Bad: Multiple updates trigger multiple localStorage writes
   updateField('clientName', 'John');
   updateField('clientEmail', 'john@example.com');
   updateField('clientPhone', '+1234567890');
   
   // ✅ Good: Single update triggers one localStorage write
   updateFields({
     clientName: 'John',
     clientEmail: 'john@example.com',
     clientPhone: '+1234567890'
   });
   ```

2. **Debouncing (Optional)**
   For real-time saving, consider debouncing localStorage writes:
   ```javascript
   const saveToLocalStorage = useCallback(
     debounce((data) => {
       localStorage.setItem('clientAgreementData', JSON.stringify(data));
     }, 1000),
     []
   );
   ```

3. **Selective Re-renders**
   Components only re-render when their data changes (thanks to React's reconciliation)

## Error Handling

### localStorage Errors

```javascript
try {
  const savedData = localStorage.getItem('clientAgreementData');
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    setFormData((prev) => ({ ...prev, ...parsedData }));
  }
} catch (error) {
  console.error('Failed to load saved data:', error);
  // Continue with default data
}
```

### Context Usage Errors

```javascript
const useDocumentContext = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocumentContext must be used within DocumentProvider');
  }
  return context;
};
```

## Extending the State

### Adding New Fields

1. **Add to initial state in DocumentProvider:**
   ```javascript
   const [formData, setFormData] = useState({
     // ... existing fields
     newField: 'default value',
   });
   ```

2. **Use in component:**
   ```javascript
   const { formData, updateField } = useDocumentContext();
   
   <input
     value={formData.newField}
     onChange={(e) => updateField('newField', e.target.value)}
   />
   ```

3. **Automatic persistence:** No additional code needed!

## Debugging

### Check localStorage in Browser DevTools

```javascript
// In browser console
localStorage.getItem('clientAgreementData') // View stored data
JSON.parse(localStorage.getItem('clientAgreementData')) // Pretty print
localStorage.removeItem('clientAgreementData') // Clear data
```

### Log State Changes

```javascript
useEffect(() => {
  console.log('Form data updated:', formData);
}, [formData]);
```

### Verify Context Access

```javascript
try {
  const context = useDocumentContext();
  console.log('Context available:', context);
} catch (error) {
  console.error('Context not available:', error);
}
```

## Migration from localStorage to Backend

To migrate to a backend API:

1. **Create an API service:**
   ```javascript
   // services/documentApi.js
   export const saveDocument = async (data) => {
     const response = await fetch('/api/documents', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(data)
     });
     return response.json();
   };
   ```

2. **Modify useEffect in DocumentProvider:**
   ```javascript
   useEffect(() => {
     saveDocument(formData); // Instead of localStorage
   }, [formData]);
   ```

3. **Load data from API:**
   ```javascript
   useEffect(() => {
     loadDocument().then(data => {
       setFormData(prev => ({ ...prev, ...data }));
     });
   }, []);
   ```

## Best Practices

1. ✅ Always use `updateField()` or `updateFields()` - never mutate state directly
2. ✅ Keep component imports at the top for clarity
3. ✅ Use `clearAllData()` for reset functionality
4. ✅ Batch related updates with `updateFields()`
5. ✅ Provide user feedback when clearing data
6. ✅ Test data persistence across browser sessions
7. ✅ Handle localStorage quota exceeded errors gracefully

## Related Files

- **DocumentContext.jsx** - Core context implementation
- **AgreementPage.jsx** - Example usage in Page 1
- **InvoicePage.jsx** - Example usage in Page 2 with data retrieval

## Testing Data Synchronization

```javascript
// Test in browser console
const ctx = useDocumentContext();

// Update field
ctx.updateField('clientName', 'Test User');

// Verify state updated
console.log(ctx.formData.clientName); // 'Test User'

// Verify localStorage updated
console.log(localStorage.getItem('clientAgreementData')); // Contains 'Test User'

// Open new tab and verify data persists
// (Close and reopen browser to test full persistence)
```

---

For more information, see [README.md](README.md) or component source code comments.
