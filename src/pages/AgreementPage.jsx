import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocumentContext } from '../context/DocumentContext';
import styles from './AgreementPage.module.css';

const AgreementPage = () => {
  const navigate = useNavigate();
  const { formData, updateField, clearAllData } = useDocumentContext();

  const handleInputChange = (e, fieldName) => {
    updateField(fieldName, e.target.value);
  };

  const docRef = useRef(null);

  const handlePrint = async () => {
    try {
      const { exportElementToPdf } = await import('../utils/pdfExport');
      const name = `${formData.projectName || 'agreement'}.pdf`.replace(/\s+/g, '_');
      await exportElementToPdf(docRef.current, name);
    } catch (err) {
      console.error('PDF export failed, falling back to print', err);
      window.print();
    }
  };

  const handleClear = () => {
    if (window.confirm('Reset all editable fields to default placeholder text?')) {
      clearAllData();
    }
  };

  return (
    <div className={styles.container}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.tbBrand}>WD Documents</div>
        <div className={styles.tbTabs}>
          <button className={`${styles.tbTab} ${styles.active}`}>
            01 — Agreement
          </button>
          <button className={styles.tbTab} onClick={() => navigate('/invoice')}>
            02 — Invoice
          </button>
          <button className={styles.tbTab} onClick={() => navigate('/welcome')}>
            03 — Welcome
          </button>
        </div>
        <div className={styles.tbActions}>
          <button className={styles.tbBtn} onClick={handleClear}>
            Clear
          </button>
          <button className={`${styles.tbBtn} ${styles.gold}`} onClick={handlePrint}>
            ↓ Download PDF
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.section}>
        <div className={styles.container_inner}>
          {/* Section Header */}
          <div className={styles.secHead}>
            <div className={styles.secNum}>01</div>
            <div className={styles.secMeta}>
              <h2>Client Agreement</h2>
              <p>Click any highlighted field to edit. Fill your details, then Download PDF.</p>
            </div>
          </div>

          {/* Edit Hint */}
          <div className={styles.editHint}>
            <span>✏</span> Click any <span>underlined gold field</span> to type your details
            directly. All fields are editable. When done, press <span>Download PDF</span>.
          </div>

          {/* Progress Bar */}
          <div className={styles.progressBar}>
            <div className={`${styles.pbStep} ${styles.done}`}></div>
            <div className={styles.pbStep}></div>
            <div className={styles.pbStep}></div>
          </div>
          <div className={styles.pbLabels}>
            <div className={`${styles.pbLabel} ${styles.active}`}>Agreement</div>
            <div className={styles.pbLabel}>Invoice</div>
            <div className={styles.pbLabel}>Welcome</div>
          </div>

          {/* Document Card */}
          <div className={styles.docCard} ref={docRef}>
            {/* Document Header */}
            <div className={styles.docHeader}>
              <div className={styles.dhl}>
                <div className={styles.co}>
                  <input
                    type="text"
                    value={formData.agencyName}
                    onChange={(e) => handleInputChange(e, 'agencyName')}
                    className={styles.editableInput}
                    spellCheck="false"
                  />
                </div>
                <h3>CLIENT<br />AGREEMENT</h3>
                <div className={styles.sub}>Effective upon signing by both parties</div>
              </div>
              <div className={styles.dhr}>
                <div className={styles.rl}>Document Ref</div>
                <div className={styles.rv}>
                  <input
                    type="text"
                    value={formData.documentRef}
                    onChange={(e) => handleInputChange(e, 'documentRef')}
                    className={styles.editableInput}
                  />
                </div>
                <div className={styles.rl}>Date</div>
                <div className={styles.rv}>
                  <input
                    type="text"
                    value={formData.dateIssued}
                    onChange={(e) => handleInputChange(e, 'dateIssued')}
                    className={styles.editableInput}
                  />
                </div>
                <div className={styles.rl}>Version</div>
                <div className={styles.rv}>1.0</div>
              </div>
            </div>

            {/* Document Body */}
            <div className={styles.docBody}>
              {/* Project Snapshot */}
              <div className={styles.snapshot}>
                <div>
                  <div className={styles.snapLabel}>Project Name</div>
                  <input
                    type="text"
                    value={formData.projectName}
                    onChange={(e) => handleInputChange(e, 'projectName')}
                    className={`${styles.snapVal} ${styles.editableInput}`}
                  />
                </div>
                <div>
                  <div className={styles.snapLabel}>Package</div>
                  <input
                    type="text"
                    value={formData.packageSelected}
                    onChange={(e) => handleInputChange(e, 'packageSelected')}
                    className={`${styles.snapVal} ${styles.gold} ${styles.editableInput}`}
                  />
                </div>
                <div>
                  <div className={styles.snapLabel}>Total Value</div>
                  <input
                    type="text"
                    value={formData.totalValue}
                    onChange={(e) => handleInputChange(e, 'totalValue')}
                    className={`${styles.snapVal} ${styles.gold} ${styles.editableInput}`}
                  />
                </div>
                <div>
                  <div className={styles.snapLabel}>Start Date</div>
                  <input
                    type="text"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange(e, 'startDate')}
                    className={`${styles.snapVal} ${styles.editableInput}`}
                  />
                </div>
                <div>
                  <div className={styles.snapLabel}>Est. Completion</div>
                  <input
                    type="text"
                    value={formData.estCompletion}
                    onChange={(e) => handleInputChange(e, 'estCompletion')}
                    className={`${styles.snapVal} ${styles.editableInput}`}
                  />
                </div>
                <div>
                  <div className={styles.snapLabel}>Assigned Contact</div>
                  <input
                    type="text"
                    value={formData.assignedContact}
                    onChange={(e) => handleInputChange(e, 'assignedContact')}
                    className={`${styles.snapVal} ${styles.editableInput}`}
                  />
                </div>
              </div>

              {/* Parties Section */}
              <div className={styles.twoCol}>
                <div className={styles.infoBlock}>
                  <h4>The Agency</h4>
                  <div className={styles.fieldRow}>
                    <span className={styles.fl}>Company</span>
                    <input
                      type="text"
                      value={formData.agencyCompany}
                      onChange={(e) => handleInputChange(e, 'agencyCompany')}
                      className={styles.editableInput}
                    />
                  </div>
                  <div className={styles.fieldRow}>
                    <span className={styles.fl}>Address</span>
                    <input
                      type="text"
                      value={formData.agencyAddress}
                      onChange={(e) => handleInputChange(e, 'agencyAddress')}
                      className={styles.editableInput}
                    />
                  </div>
                  <div className={styles.fieldRow}>
                    <span className={styles.fl}>Email</span>
                    <input
                      type="email"
                      value={formData.agencyEmail}
                      onChange={(e) => handleInputChange(e, 'agencyEmail')}
                      className={styles.editableInput}
                    />
                  </div>
                  <div className={styles.fieldRow}>
                    <span className={styles.fl}>Phone</span>
                    <input
                      type="tel"
                      value={formData.agencyPhone}
                      onChange={(e) => handleInputChange(e, 'agencyPhone')}
                      className={styles.editableInput}
                    />
                  </div>
                  <div className={styles.fieldRow}>
                    <span className={styles.fl}>Reg. No.</span>
                    <input
                      type="text"
                      value={formData.agencyRegNo}
                      onChange={(e) => handleInputChange(e, 'agencyRegNo')}
                      className={styles.editableInput}
                    />
                  </div>
                </div>

                <div className={styles.infoBlock}>
                  <h4>The Client</h4>
                  <div className={styles.fieldRow}>
                    <span className={styles.fl}>Name</span>
                    <input
                      type="text"
                      value={formData.clientName}
                      onChange={(e) => handleInputChange(e, 'clientName')}
                      className={styles.editableInput}
                    />
                  </div>
                  <div className={styles.fieldRow}>
                    <span className={styles.fl}>Business</span>
                    <input
                      type="text"
                      value={formData.clientBusiness}
                      onChange={(e) => handleInputChange(e, 'clientBusiness')}
                      className={styles.editableInput}
                    />
                  </div>
                  <div className={styles.fieldRow}>
                    <span className={styles.fl}>Address</span>
                    <input
                      type="text"
                      value={formData.clientAddress}
                      onChange={(e) => handleInputChange(e, 'clientAddress')}
                      className={styles.editableInput}
                    />
                  </div>
                  <div className={styles.fieldRow}>
                    <span className={styles.fl}>Email</span>
                    <input
                      type="email"
                      value={formData.clientEmail}
                      onChange={(e) => handleInputChange(e, 'clientEmail')}
                      className={styles.editableInput}
                    />
                  </div>
                  <div className={styles.fieldRow}>
                    <span className={styles.fl}>Phone</span>
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
                <div className={styles.dt}>Agreement Details</div>

                <div className={styles.clause}>
                  <h4>1. Definitions</h4>
                  <textarea
                    className={styles.editableTextarea}
                    value={formData.definitions}
                    onChange={(e) => handleInputChange(e, 'definitions')}
                  />
                </div>

                <div className={styles.clause}>
                  <h4>2. Scope of Services & Deliverables</h4>
                  <textarea
                    className={styles.editableTextarea}
                    value={formData.scopeServices}
                    onChange={(e) => handleInputChange(e, 'scopeServices')}
                  />
                </div>

                <div className={styles.clause}>
                  <h4>3. Payment Schedule & Terms</h4>
                  <textarea
                    className={styles.editableTextarea}
                    value={formData.paymentTerms}
                    onChange={(e) => handleInputChange(e, 'paymentTerms')}
                  />
                </div>

                <div className={styles.clause}>
                  <h4>4. Client Responsibilities</h4>
                  <textarea
                    className={styles.editableTextarea}
                    value={formData.clientResponsibilities}
                    onChange={(e) => handleInputChange(e, 'clientResponsibilities')}
                  />
                </div>

                <div className={styles.clause}>
                  <h4>5. Timeline & Client Delays</h4>
                  <textarea
                    className={styles.editableTextarea}
                    value={formData.timelineClause}
                    onChange={(e) => handleInputChange(e, 'timelineClause')}
                  />
                </div>

                <div className={styles.clause}>
                  <h4>6. Revisions, Changes & Final Approval</h4>
                  <textarea
                    className={styles.editableTextarea}
                    value={formData.revisionsClause}
                    onChange={(e) => handleInputChange(e, 'revisionsClause')}
                  />
                </div>

                <div className={styles.clause}>
                  <h4>7. Intellectual Property & Ownership</h4>
                  <textarea
                    className={styles.editableTextarea}
                    value={formData.ipOwnership}
                    onChange={(e) => handleInputChange(e, 'ipOwnership')}
                  />
                </div>

                <div className={styles.clause}>
                  <h4>8. Cancellation & Termination</h4>
                  <textarea
                    className={styles.editableTextarea}
                    value={formData.cancellationClause}
                    onChange={(e) => handleInputChange(e, 'cancellationClause')}
                  />
                </div>

                <div className={styles.clause}>
                  <h4>9. Refund Policy</h4>
                  <textarea
                    className={styles.editableTextarea}
                    value={formData.refundPolicy}
                    onChange={(e) => handleInputChange(e, 'refundPolicy')}
                  />
                </div>

                <div className={styles.clause}>
                  <h4>10. Confidentiality</h4>
                  <textarea
                    className={styles.editableTextarea}
                    value={formData.confidentiality}
                    onChange={(e) => handleInputChange(e, 'confidentiality')}
                  />
                </div>

                <div className={styles.clause}>
                  <h4>11. Limitation of Liability</h4>
                  <textarea
                    className={styles.editableTextarea}
                    value={formData.limitationLiability}
                    onChange={(e) => handleInputChange(e, 'limitationLiability')}
                  />
                </div>

                <div className={styles.clause}>
                  <h4>12. Hosting, Domain & Third-Party Costs</h4>
                  <textarea
                    className={styles.editableTextarea}
                    value={formData.hostingClause}
                    onChange={(e) => handleInputChange(e, 'hostingClause')}
                  />
                </div>

                <div className={styles.clause}>
                  <h4>13. Browser & Device Compatibility</h4>
                  <textarea
                    className={styles.editableTextarea}
                    value={formData.compatibilityClause}
                    onChange={(e) => handleInputChange(e, 'compatibilityClause')}
                  />
                </div>

                <div className={styles.clause}>
                  <h4>14. Legal Compliance & Content Accuracy</h4>
                  <textarea
                    className={styles.editableTextarea}
                    value={formData.legalCompliance}
                    onChange={(e) => handleInputChange(e, 'legalCompliance')}
                  />
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
                /> — Client Agreement
              </div>
              <div className={styles.conf}>Confidential</div>
            </div>
          </div>

          {/* Action Row */}
          <div className={styles.actionRow}>
            <button className={styles.btnGold} onClick={handlePrint}>
              ↓ Download PDF
            </button>
            <button
              className={styles.btnGhost}
              onClick={() => navigate('/invoice')}
            >
              Next: Invoice →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgreementPage;
