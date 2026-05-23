# Usage Guide - Client Agreement Application

## Quick Start

### 1. Installation

```bash
# Navigate to project folder
cd "Desktop/mywork/New folder/test"

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

### 2. Fill Out Agreement Page

1. Click on any **gold underlined field** to edit
2. Type your information (Agency Name, Project Details, etc.)
3. Data is **automatically saved** to browser storage
4. All entered data persists even if you close the browser

### 3. Navigate to Invoice Page

1. Click **"02 — Invoice"** tab or **"Next: Invoice →"** button
2. Notice all your data from Agreement page is **already filled in**
3. Edit invoice-specific fields (Invoice Number, Totals, Payment Methods)
4. Again, all changes are automatically saved

### 4. Download as PDF

1. Click **"↓ Download PDF"** button
2. Browser's print dialog opens
3. Choose "Save as PDF" option
4. ✅ **Tip**: Enable "Background graphics" for proper dark theme styling

---

## Data Synchronization Examples

### Example 1: Complete Workflow

**Step 1: Fill Agreement**
```
User enters:
- Agency Name: "Design Studio Co."
- Client Name: "Sarah Johnson"
- Project Name: "Website Redesign"
```

**Step 2: Navigate to Invoice**
```
User sees:
- Agency Name automatically shows: "Design Studio Co."
- Client info shows: "Sarah Johnson"
- Invoice now shows project context
```

**Step 3: Close and Reopen Browser**
```
Next session:
- All data is still there
- No need to re-enter anything
```

### Example 2: Updating Across Pages

**Scenario:** You realize client's email was wrong after moving to Invoice page

```
On Invoice page:
1. Find the "Billed To" section
2. Click on client email field
3. Correct the email
4. Go back to Agreement page (click "← Back")
5. Client email is already updated there too
```

### Example 3: Creating Multiple Agreements

**Scenario:** You want to create a new agreement for a different client

```
Step 1: On Agreement page, click "Clear" button
Step 2: Confirm you want to reset
Step 3: All fields reset to default placeholders
Step 4: Start filling in new client information
```

---

## Field Reference

### Agreement Page Fields

#### Top Section
| Field | Description | Example |
|-------|-------------|---------|
| Agency Name | Your company name | "Creative Solutions Inc." |
| Document Ref | Agreement reference number | "AGR-001" |
| Date | Agreement date | "15 / 05 / 2024" |
| Version | Document version | "1.0" |

#### Project Snapshot (3x2 Grid)
| Field | Description | Example |
|-------|-------------|---------|
| Project Name | Name of the project | "E-commerce Platform" |
| Package | Service package | "Full Design & Dev" |
| Total Value | Total project cost | "$5,000.00" |
| Start Date | Project start date | "01 / 06 / 2024" |
| Est. Completion | Expected end date | "15 / 07 / 2024" |
| Assigned Contact | Primary contact person | "John Smith" |

#### The Agency (Left Column)
| Field | Description | Example |
|-------|-------------|---------|
| Company | Agency legal name | "Design Studio Co." |
| Address | Business address | "123 Main St, City, State" |
| Email | Contact email | "hello@studio.com" |
| Phone | Phone number | "+1 (555) 123-4567" |
| Reg. No. | Registration/VAT number | "VAT123456" |

#### The Client (Right Column)
| Field | Description | Example |
|-------|-------------|---------|
| Name | Client's full name | "Sarah Johnson" |
| Business | Client's company | "Johnson Marketing" |
| Address | Client's address | "456 Oak Ave, City, State" |
| Email | Client's email | "sarah@johnsonmarketing.com" |
| Phone | Client's phone | "+1 (555) 987-6543" |

### Invoice Page Fields

#### Invoice Header
| Field | Description | Example |
|-------|-------------|---------|
| Invoice No. | Unique invoice number | "INV-2024-001" |
| Date of Issue | Invoice date | "15 / 05 / 2024" |
| Payment Due | Due date | "15 / 06 / 2024" |
| Currency | Currency type | "USD" |

#### Project Snapshot
| Field | Description |
|-------|-------------|
| Project | Auto-filled from Agreement |
| Agreement Ref | Reference to linked agreement |
| PO Reference | Purchase order number (if applicable) |

#### Billing Information
| Field | Description |
|-------|-------------|
| Billed From | Agency details (auto-filled) |
| Billed To | Client details (auto-filled) |

#### Line Items
| Field | Description |
|-------|-------------|
| Description | Service description |
| Qty | Quantity |
| Rate | Unit price |
| Amount | Total for line item |

#### Totals
| Field | Description | Example |
|-------|-------------|---------|
| Subtotal | Sum of all items | "$3,000" |
| Tax / VAT | Tax amount | "$300" |
| Discount | Any discount applied | "$0" |
| Project Total | Total before deposits | "$3,300" |
| Deposit Received | Deposit amount (50%) | "— $1,650" |
| Balance Due | Remaining amount | "$1,650" |

#### Payment Methods
| Field | Description | Example |
|-------|-------------|---------|
| Bank Name | Bank name | "First National Bank" |
| Account Name | Account holder name | "Design Studio Co." |
| Account No | Bank account number | "1234567890" |
| IBAN / Swift | International codes | "FNBAUS33" |
| Stripe Link | Stripe payment link | "https://pay.stripe.com/..." |
| PayPal Link | PayPal payment link | "paypal.me/designstudio" |

---

## Common Tasks

### Task 1: Edit Agency Information

1. Go to **Agreement** page (or scroll up)
2. Find **"The Agency"** section on the right
3. Click on any field you want to change
4. Type your information
5. ✅ Automatically saved and synced across pages

### Task 2: Update Client Details Mid-Project

1. Navigate to **Invoice** page
2. Locate **"Billed To"** section
3. Edit any client information
4. Switch back to **Agreement** page
5. ✅ Client details are updated there too

### Task 3: Prepare Invoice for Payment

1. Go to **Invoice** page
2. Edit line items (Services table)
3. Update totals:
   - Subtotal: sum of all items
   - Tax/VAT: calculate based on location
   - Project Total: Subtotal + Tax
   - Deposit Received: 50% of total (or custom)
   - Balance Due: Project Total - Deposit Received
4. ✅ All changes saved automatically

### Task 4: Change Payment Methods

1. On **Invoice** page, scroll to **"Payment Methods"**
2. Update bank details:
   - Bank Name
   - Account Name
   - Account Number
   - IBAN / Swift
3. Update online payment:
   - Stripe payment link
   - PayPal link
4. ✅ Changes are immediately available for PDF export

### Task 5: Reset Everything and Start Fresh

1. Click **"Clear"** button in toolbar (top right)
2. Confirm you want to reset
3. ✅ All fields return to default placeholders
4. Start entering new client information

### Task 6: Print and Email Document

**To PDF:**
1. Click **"↓ Download PDF"** button
2. Choose "Save as PDF" from print dialog
3. ✅ PDF saved with all your data

**To Email:**
1. Save as PDF (see above)
2. Attach PDF to email
3. Send to client

---

## Tips & Best Practices

### 💡 Navigation Tips
- Use the **tab buttons** at the top to quickly switch between pages
- Use **"Next"** and **"← Back"** buttons to move sequentially
- Your data follows you - no need to worry about losing information

### 💾 Data Persistence Tips
- Data is saved **automatically** as you type
- Closing the browser **doesn't erase** your data
- Each field updates are **individual** - change what you need, keep the rest
- Use **"Clear"** button only when you're ready to start completely fresh

### 📄 PDF Export Tips
- Make sure to click **"↓ Download PDF"** (not regular print)
- In print dialog, select **"Save as PDF"** option
- Enable **"Background graphics"** in print settings for proper dark styling
- Test print preview before downloading for any formatting issues

### ✏️ Editing Tips
- Click directly on **gold underlined text** to edit
- Text will **select automatically** when you click
- Press **Tab** to move to next field
- Press **Enter** to confirm (or just click elsewhere)
- Some fields show placeholder text - feel free to replace

### 🔄 Data Workflow Tips
1. **Start with Agreement page** to set up all parties and project details
2. **Copy data to Invoice** by simply navigating (auto-filled)
3. **Customize Invoice** with specific line items and totals
4. **Export to PDF** when ready
5. **Send to client** or print for signature

---

## Troubleshooting

### Problem: Data Isn't Saving

**Solution:**
1. Check if browser localStorage is enabled:
   - Firefox: Preferences → Privacy → Cookies and Site Data ✓
   - Chrome: Settings → Privacy → Clear browsing data...
2. Ensure you're not in incognito/private mode (data clears on close)
3. Try clearing browser cache and reloading page
4. Check browser console for errors (F12 → Console tab)

### Problem: Can't See Changes on Another Page

**Solution:**
1. Make sure you're clicking **gold underlined fields** to edit
2. Wait a moment for data to sync (usually instant)
3. Try navigating away and back to page
4. Clear browser cache and reload (Ctrl+Shift+R)
5. If problem persists, clear data and start fresh

### Problem: PDF Prints with Wrong Styling

**Solution:**
1. Click **"↓ Download PDF"** button (not Ctrl+P)
2. In print preview dialog:
   - Check **"Background graphics"** checkbox ✓
   - Make sure margins are set correctly
3. Try different print destination (to PDF)
4. If using dark theme, white backgrounds might show - that's normal for printing

### Problem: Form Field Placeholder Text Still Shows

**Solution:**
1. These are default placeholders - replace with your information
2. Just click on the field and type over them
3. They disappear when you enter your own text
4. Fields like "DD / MM / YYYY" are examples - use your dates

### Problem: Lost My Data After Closing Browser

**Solution:**
1. You may have been in **incognito/private mode** - data doesn't persist there
2. Try opening in regular (non-private) browsing window
3. If data is truly gone, use **"Clear"** button mentioned above to reset to defaults

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Tab` | Move to next field |
| `Shift+Tab` | Move to previous field |
| `Ctrl+P` (after clicking field) | Print current page |
| `Escape` | Cancel editing (depending on browser) |
| `Ctrl+Shift+Delete` | Open clear browsing data (to clear localStorage) |

---

## Export Formats

### Current Supported Format
- ✅ **PDF** - Print to PDF with dark theme styling

### Future Enhancement Ideas
- 📋 Export as HTML (for email)
- 📊 Export line items as CSV
- 📧 Auto-send via email (coming soon)
- 📱 Mobile app version (coming soon)

---

## Support Resources

**Related Documentation:**
- [STATE_MANAGEMENT.md](STATE_MANAGEMENT.md) - Technical details on data syncing
- [README.md](README.md) - Project overview and setup

**For Developers:**
- Check browser Console (F12) for any errors
- Use localStorage directly in console to inspect/debug data
- Review ComponentContext.jsx for state management details

---

**Last Updated:** May 2024  
**Version:** 1.0.0
