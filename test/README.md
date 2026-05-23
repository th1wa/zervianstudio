# Client Agreement Multi-Page Application

A modern, professional multi-page Client Agreement web application built with React, featuring real-time data synchronization across pages using Context API and localStorage.

## Features

✅ **Data Persistence**: All form data is automatically saved to localStorage and persists across browser sessions
✅ **Multi-Page Navigation**: Seamless navigation between Agreement, Invoice, and Welcome pages
✅ **Dark Theme**: Premium dark mode design with gold accents
✅ **Editable Fields**: All fields are directly editable with visual feedback
✅ **PDF Export**: Download documents as PDF with proper styling
✅ **Responsive Design**: Fully responsive on all device sizes
✅ **Global State Management**: Context API for centralized state management

## Tech Stack

- **Framework**: React 18.2.0
- **Routing**: React Router v6
- **State Management**: Context API with hooks
- **Styling**: CSS Modules
- **Build Tool**: Vite 5.0.0
- **Package Manager**: npm

## Project Structure

```
src/
├── context/
│   └── DocumentContext.jsx          # Global state management (Context API)
├── pages/
│   ├── AgreementPage.jsx            # Page 1: Client Agreement
│   ├── AgreementPage.module.css     # Styling for Agreement page
│   ├── InvoicePage.jsx              # Page 2: Professional Invoice
│   └── InvoicePage.module.css       # Styling for Invoice page
├── App.jsx                          # Main application component
├── App.css                          # Global styles
└── main.jsx                         # React entry point
```

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The application will open at `http://localhost:3000`

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

## How Data Synchronization Works

### Global State (Context API)

The `DocumentContext` manages all form data globally. It provides:

- **`formData`**: Object containing all form field values
- **`updateField(fieldName, value)`**: Updates a single field and syncs to localStorage
- **`updateFields(updates)`**: Batch update multiple fields
- **`clearAllData()`**: Reset all fields to default values

### localStorage Integration

Data is automatically persisted to localStorage whenever it changes:

```javascript
// Data is saved here
const [formData, setFormData] = useState({...});

// Automatically synced on component mount
useEffect(() => {
  const savedData = localStorage.getItem('clientAgreementData');
  if (savedData) {
    setFormData(prev => ({ ...prev, ...JSON.parse(savedData) }));
  }
}, []);

// Automatically saved whenever formData changes
useEffect(() => {
  localStorage.setItem('clientAgreementData', JSON.stringify(formData));
}, [formData]);
```

## Usage Examples

### Accessing Context in a Component

```javascript
import { useDocumentContext } from '../context/DocumentContext';

function MyComponent() {
  const { formData, updateField } = useDocumentContext();
  
  return (
    <input 
      value={formData.clientName}
      onChange={(e) => updateField('clientName', e.target.value)}
    />
  );
}
```

### Form Data Fields

**Agreement Section:**
- `agencyName` - Your Agency Name
- `documentRef` - Document Reference (e.g., AGR-001)
- `dateIssued` - Date Issued
- `projectName` - Project Name
- `packageSelected` - Selected Package
- `totalValue` - Total Project Value
- `startDate` - Project Start Date
- `estCompletion` - Estimated Completion Date
- `assignedContact` - Assigned Contact Person

**Agency Details:**
- `agencyCompany` - Company Name
- `agencyAddress` - Business Address
- `agencyEmail` - Email Address
- `agencyPhone` - Phone Number
- `agencyRegNo` - Registration Number

**Client Details:**
- `clientName` - Client Full Name
- `clientBusiness` - Client Business Name
- `clientAddress` - Client Address
- `clientEmail` - Client Email
- `clientPhone` - Client Phone

**Invoice Section:**
- `invoiceNo` - Invoice Number
- `dueDate` - Payment Due Date
- `currency` - Currency Type
- `subtotal` - Invoice Subtotal
- `tax` - Tax/VAT Amount
- `discount` - Discount Amount
- `projectTotal` - Total Project Amount
- `balanceDue` - Balance Due

**Payment Methods:**
- `bankName` - Bank Name
- `accountName` - Account Name
- `accountNo` - Account Number
- `ibanSwift` - IBAN/Swift Code
- `stripeLink` - Stripe Payment Link
- `paypalLink` - PayPal Link

## Design Specifications

### Color Scheme
- **Background**: Deep black (#080808)
- **Cards**: Dark grey (#111, #161616)
- **Borders**: Subtle grey (#242424, #1e1e1e)
- **Accents**: Gold/Bronze (#c9a84c, #e8c97a)
- **Text**: Off-white (#f0ece3)
- **Secondary**: Muted grey (#777, #555)

### Typography
- **Serif Font**: Cormorant Garamond (headings, titles)
- **Sans-serif Font**: DM Sans (body text, labels)

### Key UI Components
- Sticky toolbar with tab navigation
- Editable fields with dashed underline borders
- Gold border highlight on focus
- Snapshot grid (3 columns on desktop, 1 on mobile)
- Two-column layout for agency and client details
- Professional document card styling

## Responsive Design

The application is fully responsive with breakpoints:

- **Desktop**: Full layout with 2-column grids and 3-column snapshots
- **Tablet**: Adjusted spacing and 2-column snapshots
- **Mobile** (< 640px): Single column layout with adjusted padding and font sizes

## PDF Export

Click "Download PDF" to export the current page as a PDF:

1. Print view automatically hides toolbars and edit hints
2. Background graphics are included for dark theme
3. Page breaks are properly handled for multi-page documents
4. Use "Save as PDF" in the print dialog

**Tip**: Enable "Background graphics" in print settings for proper dark theme styling.

## Extending the Application

### Adding a New Page

1. Create a new component in `src/pages/WelcomePage.jsx`
2. Create corresponding CSS Module `src/pages/WelcomePage.module.css`
3. Import and add route in `src/App.jsx`:
   ```javascript
   import WelcomePage from './pages/WelcomePage';
   
   <Route path="/welcome" element={<WelcomePage />} />
   ```
4. Add navigation button in toolbar

### Adding New Form Fields

1. Add field to default state in `src/context/DocumentContext.jsx`
2. Use `updateField()` in your component
3. Data automatically syncs to localStorage

### Customizing Styling

Each page has its own CSS Module (e.g., `AgreementPage.module.css`) for easy customization:

```css
:root {
  --gold: #c9a84c; /* Change accent color */
  --black: #080808; /* Change background */
  /* ... other variables */
}
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Modern mobile browsers

## Performance Optimization

- CSS Modules prevent style conflicts
- Context API reduces prop drilling
- localStorage provides instant data persistence
- Lazy route loading with React Router

## Common Issues & Solutions

**Issue**: Data not persisting between sessions
- **Solution**: Check browser localStorage is enabled and not full

**Issue**: Styles not applying correctly
- **Solution**: Ensure CSS Modules are imported with `.module.css` extension

**Issue**: Navigation buttons not working
- **Solution**: Verify routes are correctly defined in `App.jsx`

## Future Enhancements

- [ ] Add Welcome page (Page 3)
- [ ] Implement PDF generation with better formatting
- [ ] Add signature capture feature
- [ ] Email integration to send documents directly
- [ ] Multi-language support
- [ ] Custom branding templates
- [ ] Revision history tracking
- [ ] Client portal integration

## License

MIT - Feel free to use and modify for your projects

## Support

For issues or questions, refer to the component documentation in code comments or contact the development team.
