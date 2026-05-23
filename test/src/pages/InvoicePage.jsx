import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocumentContext } from '../context/DocumentContext';
import styles from './InvoicePage.module.css';

const InvoicePage = () => {
  const navigate = useNavigate();
  const { formData, updateField } = useDocumentContext();

  const handleInputChange = (e, fieldName) => {
    updateField(fieldName, e.target.value);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={styles.container}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.tbBrand}>WD Documents</div>
        <div className={styles.tbTabs}>
          <button className={styles.tbTab} onClick={() => navigate('/agreement')}>
            01 — Agreement
          </button>
          <button className={`${styles.tbTab} ${styles.active}`}>
            02 — Invoice
          </button>
          <button className={styles.tbTab} onClick={() => navigate('/welcome')}>
            03 — Welcome
          </button>
        </div>
        <div className={styles.tbActions}>
          <button
            className={`${styles.tbBtn} ${styles.gold}`}
            onClick={handlePrint}
          >
            ↓ Download PDF
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.section}>
        <div className={styles.container_inner}>
          {/* Section Header */}
          <div className={styles.secHead}>
            <div className={styles.secNum}>02</div>
            <div className={styles.secMeta}>
              <h2>Professional Invoice</h2>
              <p>Data from Agreement page is auto-populated. Edit as needed, then Download PDF.</p>
            </div>
          </div>

          {/* Edit Hint */}
          <div className={styles.editHint}>
            <span>✏</span> All data from the <span>Agreement page is auto-populated</span>. Edit
            any <span>gold underlined fields</span> as needed. Press <span>Download PDF</span>{' '}
            when ready.
          </div>

          {/* Progress Bar */}
          <div className={styles.progressBar}>
            <div className={`${styles.pbStep} ${styles.done}`}></div>
            <div className={`${styles.pbStep} ${styles.done}`}></div>
            <div className={styles.pbStep}></div>
          </div>
          <div className={styles.pbLabels}>
            <div className={styles.pbLabel}>Agreement</div>
            <div className={`${styles.pbLabel} ${styles.active}`}>Invoice</div>
            <div className={styles.pbLabel}>Welcome</div>
          </div>

          {/* Document Card */}
          <div className={styles.docCard}>
            {/* Document Header */}
            <div className={styles.docHeader}>
              <div className={styles.dhl}>
                <div className={styles.co}>
                  <input
                    type="text"
                    value={formData.agencyName}
                    onChange={(e) => handleInputChange(e, 'agencyName')}
                    className={styles.editableInput}
                  />
                </div>
                <h3>INVOICE</h3>
                <div className={styles.sub}>
                  <input
                    type="text"
                    value={formData.agencyCompany}
                    onChange={(e) => handleInputChange(e, 'agencyCompany')}
                    className={styles.editableInput}
                  />
                </div>
              </div>
              <div className={styles.dhr}>
                <div className={styles.rl}>Invoice No.</div>
                <div className={`${styles.rv} ${styles.invoiceNumber}`}>
                  <input
                    type="text"
                    value={formData.invoiceNo}
                    onChange={(e) => handleInputChange(e, 'invoiceNo')}
                    className={styles.editableInput}
                  />
                </div>
                <div className={styles.rl}>Date of Issue</div>
                <div className={styles.rv}>
                  <input
                    type="text"
                    value={formData.dateIssued}
                    onChange={(e) => handleInputChange(e, 'dateIssued')}
                    className={styles.editableInput}
                  />
                </div>
                <div className={styles.rl}>Payment Due</div>
                <div className={`${styles.rv} ${styles.gold}`}>
                  <input
                    type="text"
                    value={formData.dueDate}
                    onChange={(e) => handleInputChange(e, 'dueDate')}
                    className={styles.editableInput}
                  />
                </div>
                <div className={styles.rl}>Currency</div>
                <div className={styles.rv}>
                  <input
                    type="text"
                    value={formData.currency}
                    onChange={(e) => handleInputChange(e, 'currency')}
                    className={styles.editableInput}
                  />
                </div>
              </div>
            </div>

            {/* Document Body */}
            <div className={styles.docBody}>
              {/* Project Snapshot - Data populated from Agreement */}
              <div className={styles.snapshot}>
                <div>
                  <div className={styles.snapLabel}>Project</div>
                  <div className={styles.snapVal}>
                    {formData.projectName}
                  </div>
                </div>
                <div>
                  <div className={styles.snapLabel}>Agreement Ref</div>
                  <div className={styles.snapVal}>
                    {formData.agreementRef}
                  </div>
                </div>
                <div>
                  <div className={styles.snapLabel}>PO Reference</div>
                  <div className={styles.snapVal}>
                    {formData.poReference}
                  </div>
                </div>
              </div>

              {/* Billing Info */}
              <div className={styles.twoCol}>
                <div className={styles.infoBlock}>
                  <h4>Billed From</h4>
                  <div className={styles.fieldRow}>
                    <input
                      type="text"
                      value={formData.agencyCompany}
                      onChange={(e) => handleInputChange(e, 'agencyCompany')}
                      className={styles.editableInput}
                    />
                  </div>
                  <div className={styles.fieldRow}>
                    <input
                      type="text"
                      value={formData.agencyAddress}
                      onChange={(e) => handleInputChange(e, 'agencyAddress')}
                      className={styles.editableInput}
                    />
                  </div>
                  <div className={styles.fieldRow}>
                    <input
                      type="email"
                      value={formData.agencyEmail}
                      onChange={(e) => handleInputChange(e, 'agencyEmail')}
                      className={styles.editableInput}
                    />
                  </div>
                  <div className={styles.fieldRow}>
                    <input
                      type="tel"
                      value={formData.agencyPhone}
                      onChange={(e) => handleInputChange(e, 'agencyPhone')}
                      className={styles.editableInput}
                    />
                  </div>
                  <div className={styles.fieldRow}>
                    <span className={styles.fl}>Tax/VAT No.</span>
                    <input
                      type="text"
                      value="N/A"
                      className={styles.editableInput}
                      readOnly
                    />
                  </div>
                </div>

                <div className={styles.infoBlock}>
                  <h4>Billed To</h4>
                  <div className={styles.fieldRow}>
                    <input
                      type="text"
                      value={formData.clientName}
                      onChange={(e) => handleInputChange(e, 'clientName')}
                      className={styles.editableInput}
                    />
                  </div>
                  <div className={styles.fieldRow}>
                    <input
                      type="text"
                      value={formData.clientBusiness}
                      onChange={(e) => handleInputChange(e, 'clientBusiness')}
                      className={styles.editableInput}
                    />
                  </div>
                  <div className={styles.fieldRow}>
                    <input
                      type="text"
                      value={formData.clientAddress}
                      onChange={(e) => handleInputChange(e, 'clientAddress')}
                      className={styles.editableInput}
                    />
                  </div>
                  <div className={styles.fieldRow}>
                    <input
                      type="email"
                      value={formData.clientEmail}
                      onChange={(e) => handleInputChange(e, 'clientEmail')}
                      className={styles.editableInput}
                    />
                  </div>
                  <div className={styles.fieldRow}>
                    <input
                      type="tel"
                      value={formData.clientPhone}
                      onChange={(e) => handleInputChange(e, 'clientPhone')}
                      className={styles.editableInput}
                    />
                  </div>
                </div>
              </div>

              <hr className={styles.dd} />
              <div className={styles.dt}>Services & Line Items</div>

              {/* Services Table */}
              <table className={styles.svcTable}>
                <thead>
                  <tr>
                    <th style={{ width: '50%' }}>Description</th>
                    <th>Qty</th>
                    <th>Rate</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className={styles.iname}>Website Design & Development</div>
                      <div className={styles.idesc}>
                        Full responsive site — UI/UX design, development, mobile-optimised
                      </div>
                    </td>
                    <td>1</td>
                    <td>$500</td>
                    <td>$500</td>
                  </tr>
                  <tr>
                    <td>
                      <div className={styles.iname}>SEO Setup & On-Page Optimisation</div>
                      <div className={styles.idesc}>Meta tags, sitemap, Search Console, heading structure</div>
                    </td>
                    <td>1</td>
                    <td>$100</td>
                    <td>$100</td>
                  </tr>
                  <tr>
                    <td>
                      <div className={styles.iname}>Post-Launch Support — 30 Days</div>
                      <div className={styles.idesc}>
                        Bug fixes, minor content edits, performance monitoring
                      </div>
                    </td>
                    <td>1</td>
                    <td>$80</td>
                    <td>$80</td>
                  </tr>
                </tbody>
              </table>

              {/* Totals */}
              <div className={styles.totalsWrap}>
                <div className={styles.totalsBlock}>
                  <div className={styles.totalRow}>
                    <span className={styles.lbl}>Subtotal</span>
                    <input
                      type="text"
                      value={formData.subtotal}
                      onChange={(e) => handleInputChange(e, 'subtotal')}
                      className={styles.editableInput}
                    />
                  </div>
                  <div className={styles.totalRow}>
                    <span className={styles.lbl}>Tax / VAT</span>
                    <input
                      type="text"
                      value={formData.tax}
                      onChange={(e) => handleInputChange(e, 'tax')}
                      className={styles.editableInput}
                    />
                  </div>
                  <div className={styles.totalRow}>
                    <span className={styles.lbl}>Discount</span>
                    <input
                      type="text"
                      value={formData.discount}
                      onChange={(e) => handleInputChange(e, 'discount')}
                      className={styles.editableInput}
                    />
                  </div>
                  <div className={`${styles.totalRow} ${styles.projectTotal}`}>
                    <span className={styles.lbl}>Project Total</span>
                    <input
                      type="text"
                      value={formData.projectTotal}
                      onChange={(e) => handleInputChange(e, 'projectTotal')}
                      className={styles.editableInput}
                    />
                  </div>
                  <div className={styles.totalRow}>
                    <span className={styles.lbl}>Deposit Received (50%)</span>
                    <input
                      type="text"
                      value={formData.depositReceived}
                      onChange={(e) => handleInputChange(e, 'depositReceived')}
                      className={styles.editableInput}
                    />
                  </div>
                  <div className={`${styles.totalRow} ${styles.grand}`}>
                    <span>Balance Due</span>
                    <input
                      type="text"
                      value={formData.balanceDue}
                      onChange={(e) => handleInputChange(e, 'balanceDue')}
                      className={styles.editableInput}
                    />
                  </div>
                </div>
              </div>

              <hr className={styles.dd} />
              <div className={styles.dt}>Payment Methods</div>

              {/* Payment Grid */}
              <div className={styles.payGrid}>
                <div className={styles.payBlock}>
                  <h4>Bank Transfer</h4>
                  <p>
                    Bank:{' '}
                    <input
                      type="text"
                      value={formData.bankName}
                      onChange={(e) => handleInputChange(e, 'bankName')}
                      className={styles.editableInput}
                    />
                    <br />
                    Account Name:{' '}
                    <input
                      type="text"
                      value={formData.accountName}
                      onChange={(e) => handleInputChange(e, 'accountName')}
                      className={styles.editableInput}
                    />
                    <br />
                    Account No:{' '}
                    <input
                      type="text"
                      value={formData.accountNo}
                      onChange={(e) => handleInputChange(e, 'accountNo')}
                      className={styles.editableInput}
                    />
                    <br />
                    IBAN / Swift:{' '}
                    <input
                      type="text"
                      value={formData.ibanSwift}
                      onChange={(e) => handleInputChange(e, 'ibanSwift')}
                      className={styles.editableInput}
                    />
                    <br />
                    Reference:{' '}
                    <input
                      type="text"
                      value={formData.invoiceNo}
                      onChange={(e) => handleInputChange(e, 'invoiceNo')}
                      className={styles.editableInput}
                    />
                  </p>
                </div>
                <div className={styles.payBlock}>
                  <h4>Online Payment</h4>
                  <p>
                    Stripe link:
                    <br />
                    <input
                      type="text"
                      value={formData.stripeLink}
                      onChange={(e) => handleInputChange(e, 'stripeLink')}
                      className={styles.editableInput}
                    />
                    <br />
                    <br />
                    PayPal:
                    <br />
                    <input
                      type="text"
                      value={formData.paypalLink}
                      onChange={(e) => handleInputChange(e, 'paypalLink')}
                      className={styles.editableInput}
                    />
                  </p>
                </div>
              </div>

              <div className={styles.notice}>
                <strong>Payment Confirmation:</strong> Please send confirmation to{' '}
                <input
                  type="email"
                  value={formData.agencyEmail}
                  onChange={(e) => handleInputChange(e, 'agencyEmail')}
                  className={styles.editableInput}
                />{' '}
                once transferred.
                <br />
                <strong>Late Payment Notice:</strong> Invoices unpaid after the due date will
                incur a 5% late fee per 7-day period.
              </div>
            </div>

            {/* Document Footer */}
            <div className={styles.docFooter}>
              <div className={styles.brand}>
                <input
                  type="text"
                  value={formData.agencyName}
                  onChange={(e) => handleInputChange(e, 'agencyName')}
                  className={styles.editableInput}
                />{' '}
                — Invoice ·{' '}
                <input
                  type="text"
                  value={formData.invoiceNo}
                  onChange={(e) => handleInputChange(e, 'invoiceNo')}
                  className={styles.editableInput}
                />
              </div>
              <div className={styles.conf}>Thank you for your business</div>
            </div>
          </div>

          {/* Action Row */}
          <div className={styles.actionRow}>
            <button className={styles.btnGold} onClick={handlePrint}>
              ↓ Download PDF
            </button>
            <button
              className={styles.btnGhost}
              onClick={() => navigate('/welcome')}
            >
              Next: Welcome →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
