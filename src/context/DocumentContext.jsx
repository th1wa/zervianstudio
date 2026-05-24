import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const DocumentContext = createContext();

// Custom hook to use the context
export const useDocumentContext = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocumentContext must be used within DocumentProvider');
  }
  return context;
};

// Context Provider Component
export const DocumentProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    // Agreement Section
    agencyName: 'Zervian Studio PVT LTD',
    documentRef: 'AGR-001',
    dateIssued: 'DD / MM / YYYY',
    version: '1.0',
    
    // Project Snapshot
    projectName: 'Project Name',
    packageSelected: 'Package Selected',
    totalValue: '$0.00',
    startDate: 'DD / MM / YYYY',
    estCompletion: 'DD / MM / YYYY',
    assignedContact: 'Your Name',
    
    // The Agency (user defaults)
    agencyCompany: 'Zervian Studio PVT LTD',
    agencyAddress: '162, Farmgrove Estate,\nVeyangoda',
    agencyEmail: 'zervianstudio@gmail.com',
    agencyPhone: '+94 70 1699 756',
    agencyRegNo: 'N/A',
    
    // The Client
    clientName: 'Client Full Name',
    clientBusiness: 'Client Business Name',
    clientAddress: 'Client Address',
    clientEmail: 'client@email.com',
    clientPhone: '+00 000 0000',
    
    // Invoice fields
    invoiceNo: 'INV-001',
    dueDate: 'DD / MM / YYYY',
    currency: 'USD',
    agreementRef: 'AGR-001',
    poReference: 'N/A',
    
    // Invoice line items
    subtotal: '$680',
    tax: '$0',
    discount: '$0',
    projectTotal: '$680',
    depositReceived: '— $340',
    balanceDue: '$340',
    
    // Payment methods
    bankName: 'Bank Name',
    accountName: 'Your Name',
    accountNo: '000 000 0000',
    ibanSwift: 'N/A',
    stripeLink: 'https://stripe.com/pay/your-link',
    paypalLink: 'paypal.me/yourname',
    // Welcome quick links and contact details
    signedAgreementLink: '→ Paste link here',
    invoiceLink: '→ Paste link here',
    clientPortalLink: '→ Paste Notion / Drive link',
    fileDeliveryLink: '→ Paste Google Drive / Dropbox link',
    responseTime: 'within 1 business day',
    revisionTurnaround: '2 business days',
    preferredChannel: 'Email',
    // Agreement clauses / long-form fields
    definitions: '"Agency" refers to Your Business Name. "Client" refers to the party named above. "Project" refers to the scope of work outlined in the agreed proposal. "Deliverables" means all files, designs, and assets produced. "Working days" means Monday to Friday, excluding public holidays.',
    scopeServices: 'The Agency agrees to provide website design & development, UI/UX design, content integration, basic on-page SEO, cross-browser testing, and up to 3 rounds of revisions. Post-launch support of 30 days is included unless otherwise specified.',
    paymentTerms: 'A non-refundable deposit of 50% of the total project fee is required before work commences. Remaining balance is due upon project completion before final delivery. Payment due within 7 days of invoice; late payments incur a 5% fee per 7-day period.',
    clientResponsibilities: 'The Client will provide timely content, feedback, domain/hosting access, and a single point of contact. Failure to provide requested materials may delay the project timeline.',
    timelineClause: 'Estimated timelines are provided in the proposal. Client delays may shift the timeline; the Agency is not responsible for delays caused by late materials or approvals.',
    revisionsClause: 'Includes 3 rounds of revisions. Additional revisions will be billed at $50/hr. Final approval converts the deliverables to a new maintenance request if further edits are required.',
    ipOwnership: 'Upon receipt of full payment, the Client receives ownership of final deliverables. The Agency retains ownership until payment is received. Third-party assets remain subject to their licences.',
    cancellationClause: 'Either party may terminate with 7 days written notice. The deposit is non-refundable; completed work through cancellation will be invoiced and due immediately.',
    refundPolicy: 'Initial deposit is non-refundable. Partial refunds may be negotiated if the Agency fails to deliver agreed services without reasonable cause.',
    confidentiality: 'Both parties agree to keep project details and client data confidential. Disclosure to third parties requires prior written consent except as required by law.',
    limitationLiability: 'The Agency\'s liability is limited to the total fees paid. The Agency is not liable for indirect, incidental, or consequential damages.',
    hostingClause: 'Client is responsible for hosting, domains, and third-party costs unless explicitly included in the proposal.',
    compatibilityClause: 'Site is tested on modern browsers and standard devices. The Agency does not guarantee compatibility with outdated or custom enterprise environments.',
    legalCompliance: 'The Client is responsible for ensuring content is accurate, legally compliant, and that they hold rights to materials provided.',
  });

  const migrateOldAgencyPlaceholders = (data) => {
    const migrated = { ...data };

    if (migrated.agencyName === 'Your Agency Name') {
      migrated.agencyName = 'Zervian Studio PVT LTD';
    }
    if (migrated.agencyCompany === 'Your Business Name') {
      migrated.agencyCompany = 'Zervian Studio PVT LTD';
    }
    if (migrated.agencyAddress === 'Your Address') {
      migrated.agencyAddress = '162, Farmgrove Estate, Veyangoda';
    }
    if (migrated.agencyEmail === 'you@youragency.com') {
      migrated.agencyEmail = 'zervianstudio@gmail.com';
    }
    if (migrated.agencyPhone === '+00 000 0000') {
      migrated.agencyPhone = '+94 70 1699 756';
    }

    return migrated;
  };

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('clientAgreementData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        const migratedData = migrateOldAgencyPlaceholders(parsedData);
        setFormData((prev) => ({ ...prev, ...migratedData }));
      } catch (error) {
        console.error('Failed to load saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('clientAgreementData', JSON.stringify(formData));
  }, [formData]);

  // Update a single field
  const updateField = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // Update multiple fields at once
  const updateFields = (updates) => {
    setFormData((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  // Clear all data and reset to defaults
  const clearAllData = () => {
    const defaultData = {
      agencyName: 'Zervian Studio PVT LTD',
      documentRef: 'AGR-001',
      dateIssued: 'DD / MM / YYYY',
      version: '1.0',
      projectName: 'Project Name',
      packageSelected: 'Package Selected',
      totalValue: '$0.00',
      startDate: 'DD / MM / YYYY',
      estCompletion: 'DD / MM / YYYY',
      assignedContact: 'Your Name',
      agencyCompany: 'Zervian Studio PVT LTD',
      agencyAddress: '162, Farmgrove Estate,\nVeyangoda',
      agencyEmail: 'zervianstudio@gmail.com',
      agencyPhone: '+94 70 1699 756',
      agencyRegNo: 'N/A',
      clientName: 'Client Full Name',
      clientBusiness: 'Client Business Name',
      clientAddress: 'Client Address',
      clientEmail: 'client@email.com',
      clientPhone: '+00 000 0000',
      invoiceNo: 'INV-001',
      dueDate: 'DD / MM / YYYY',
      currency: 'USD',
      agreementRef: 'AGR-001',
      poReference: 'N/A',
      subtotal: '$680',
      tax: '$0',
      discount: '$0',
      projectTotal: '$680',
      depositReceived: '— $340',
      balanceDue: '$340',
      bankName: 'Bank Name',
      accountName: 'Your Name',
      accountNo: '000 000 0000',
      ibanSwift: 'N/A',
      stripeLink: 'https://stripe.com/pay/your-link',
      paypalLink: 'paypal.me/yourname',
      signedAgreementLink: '→ Paste link here',
      invoiceLink: '→ Paste link here',
      clientPortalLink: '→ Paste Notion / Drive link',
      fileDeliveryLink: '→ Paste Google Drive / Dropbox link',
      responseTime: 'within 1 business day',
      revisionTurnaround: '2 business days',
      preferredChannel: 'Email',
      definitions: '"Agency" refers to Your Business Name. "Client" refers to the party named above. "Project" refers to the scope of work outlined in the agreed proposal. "Deliverables" means all files, designs, and assets produced. "Working days" means Monday to Friday, excluding public holidays.',
      scopeServices: 'The Agency agrees to provide website design & development, UI/UX design, content integration, basic on-page SEO, cross-browser testing, and up to 3 rounds of revisions. Post-launch support of 30 days is included unless otherwise specified.',
      paymentTerms: 'A non-refundable deposit of 50% of the total project fee is required before work commences. Remaining balance is due upon project completion before final delivery. Payment due within 7 days of invoice; late payments incur a 5% fee per 7-day period.',
      clientResponsibilities: 'The Client will provide timely content, feedback, domain/hosting access, and a single point of contact. Failure to provide requested materials may delay the project timeline.',
      timelineClause: 'Estimated timelines are provided in the proposal. Client delays may shift the timeline; the Agency is not responsible for delays caused by late materials or approvals.',
      revisionsClause: 'Includes 3 rounds of revisions. Additional revisions will be billed at $50/hr. Final approval converts the deliverables to a new maintenance request if further edits are required.',
      ipOwnership: 'Upon receipt of full payment, the Client receives ownership of final deliverables. The Agency retains ownership until payment is received. Third-party assets remain subject to their licences.',
      cancellationClause: 'Either party may terminate with 7 days written notice. The deposit is non-refundable; completed work through cancellation will be invoiced and due immediately.',
      refundPolicy: 'Initial deposit is non-refundable. Partial refunds may be negotiated if the Agency fails to deliver agreed services without reasonable cause.',
      confidentiality: 'Both parties agree to keep project details and client data confidential. Disclosure to third parties requires prior written consent except as required by law.',
      limitationLiability: 'The Agency\'s liability is limited to the total fees paid. The Agency is not liable for indirect, incidental, or consequential damages.',
      hostingClause: 'Client is responsible for hosting, domains, and third-party costs unless explicitly included in the proposal.',
      compatibilityClause: 'Site is tested on modern browsers and standard devices. The Agency does not guarantee compatibility with outdated or custom enterprise environments.',
      legalCompliance: 'The Client is responsible for ensuring content is accurate, legally compliant, and that they hold rights to materials provided.',
    };
    setFormData(defaultData);
    localStorage.removeItem('clientAgreementData');
  };

  const value = {
    formData,
    updateField,
    updateFields,
    clearAllData,
  };

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
};

export default DocumentContext;
