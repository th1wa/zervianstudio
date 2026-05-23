import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocumentContext } from '../context/DocumentContext';
import styles from './WelcomePage.module.css';

const WelcomePage = () => {
  const navigate = useNavigate();
  const { formData, updateField } = useDocumentContext();

  const handleInputChange = (e, fieldName) => {
    updateField(fieldName, e.target.value);
  };

  const handlePrint = () => {
    window.print();
  };

  const [checklist, setChecklist] = React.useState({
    logo: false,
    branding: false,
    content: false,
    images: false,
    social: false,
    contact: false,
    reference: false,
    hosting: false,
    guidelines: false,
    integrations: false,
  });

  const toggleCheck = (key) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
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
          <button className={styles.tbTab} onClick={() => navigate('/invoice')}>
            02 — Invoice
          </button>
          <button className={`${styles.tbTab} ${styles.active}`}>
            03 — Welcome
          </button>
        </div>
        <div className={styles.tbActions}>
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
            <div className={styles.secNum}>03</div>
            <div className={styles.secMeta}>
              <h2>Welcome & Onboarding</h2>
              <p>Fill all fields, tick the checklist items as received, then Download PDF.</p>
            </div>
          </div>

          {/* Edit Hint */}
          <div className={styles.editHint}>
            <span>✏</span> Click any <span>underlined field</span> to edit. Tick checklist boxes as you receive assets from the client. Press <span>Download PDF</span> when ready.
          </div>

          {/* Progress Bar */}
          <div className={styles.progressBar}>
            <div className={`${styles.pbStep} ${styles.done}`}></div>
            <div className={`${styles.pbStep} ${styles.done}`}></div>
            <div className={`${styles.pbStep} ${styles.done}`}></div>
          </div>
          <div className={styles.pbLabels}>
            <div className={styles.pbLabel}>Agreement</div>
            <div className={styles.pbLabel}>Invoice</div>
            <div className={`${styles.pbLabel} ${styles.active}`}>Welcome</div>
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
                <h3>WELCOME</h3>
                <div className={styles.sub}>Your complete onboarding guide</div>
              </div>
              <div className={styles.dhr}>
                <div className={styles.rl}>Prepared For</div>
                <div className={styles.rv}>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => handleInputChange(e, 'clientName')}
                    className={styles.editableInput}
                  />
                </div>
                <div className={styles.rl}>Prepared By</div>
                <div className={styles.rv}>
                  <input
                    type="text"
                    value={formData.assignedContact}
                    onChange={(e) => handleInputChange(e, 'assignedContact')}
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
              </div>
            </div>

            {/* Document Body */}
            <div className={styles.docBody}>
              {/* Welcome Letter */}
              <div className={styles.welcomeLetter}>
                Hey <strong>{formData.clientName}</strong>,<br /><br />
                Thank you for choosing to work with us. We're genuinely excited to bring your vision to life and committed to making this process as smooth, transparent, and enjoyable as possible. This document contains everything you need to get started — your links, your project process, communication details, and what we need from you. Keep it handy throughout the project.<br /><br />
                — <strong>{formData.assignedContact}, {formData.agencyName}</strong>
              </div>

              {/* Project Snapshot */}
              <div className={styles.dt}>Project Snapshot</div>
              <div className={styles.snapshot}>
                <div>
                  <div className={styles.snapLabel}>Project Name</div>
                  <div className={styles.snapVal}>{formData.projectName}</div>
                </div>
                <div>
                  <div className={styles.snapLabel}>Package</div>
                  <div className={`${styles.snapVal} ${styles.gold}`}>{formData.packageSelected}</div>
                </div>
                <div>
                  <div className={styles.snapLabel}>Project Value</div>
                  <div className={`${styles.snapVal} ${styles.gold}`}>{formData.totalValue}</div>
                </div>
                <div>
                  <div className={styles.snapLabel}>Start Date</div>
                  <div className={styles.snapVal}>{formData.startDate}</div>
                </div>
                <div>
                  <div className={styles.snapLabel}>Estimated Launch</div>
                  <div className={styles.snapVal}>{formData.estCompletion}</div>
                </div>
                <div>
                  <div className={styles.snapLabel}>Your Contact</div>
                  <div className={styles.snapVal}>{formData.assignedContact}</div>
                </div>
              </div>

              <hr className={styles.dd} />
              <div className={styles.dt}>Your Quick Links</div>
              <div className={styles.welcomeGrid}>
                <div className={styles.wg}>
                  <h4>Signed Agreement</h4>
                  <input
                    type="text"
                    value={formData.signedAgreementLink}
                    onChange={(e) => handleInputChange(e, 'signedAgreementLink')}
                    className={styles.linkInput}
                  />
                  <p>Your signed contract stored here for reference.</p>
                </div>
                <div className={styles.wg}>
                  <h4>Invoice</h4>
                  <input
                    type="text"
                    value={formData.invoiceLink}
                    onChange={(e) => handleInputChange(e, 'invoiceLink')}
                    className={styles.linkInput}
                  />
                  <p>Your invoice and payment record.</p>
                </div>
                <div className={styles.wg}>
                  <h4>Client Portal</h4>
                  <input
                    type="text"
                    value={formData.clientPortalLink}
                    onChange={(e) => handleInputChange(e, 'clientPortalLink')}
                    className={styles.linkInput}
                  />
                  <p>Track the project, view files, leave feedback, and stay updated — all in one place.</p>
                </div>
                <div className={styles.wg}>
                  <h4>File Delivery Folder</h4>
                  <input
                    type="text"
                    value={formData.fileDeliveryLink}
                    onChange={(e) => handleInputChange(e, 'fileDeliveryLink')}
                    className={styles.linkInput}
                  />
                  <p>All final deliverables will be uploaded here upon project completion.</p>
                </div>
              </div>

              <hr className={styles.dd} />
              <div className={styles.dt}>Communication & Availability</div>
              <div className={styles.welcomeGrid}>
                <div className={styles.wg}>
                  <h4>How to Reach Us</h4>
                  <p>
                    Email: <input
                      type="email"
                      value={formData.agencyEmail}
                      onChange={(e) => handleInputChange(e, 'agencyEmail')}
                      className={styles.linkInput}
                    /><br />
                    Phone: <input
                      type="text"
                      value={formData.agencyPhone}
                      onChange={(e) => handleInputChange(e, 'agencyPhone')}
                      className={styles.linkInput}
                    /><br />
                    Portal: <input
                      type="text"
                      value={formData.clientPortalLink}
                      onChange={(e) => handleInputChange(e, 'clientPortalLink')}
                      className={styles.linkInput}
                    /><br />
                    Emergency: <span style={{ color: 'var(--gold)' }}>WhatsApp only</span>
                  </p>
                </div>
                <div className={styles.wg}>
                  <h4>Office Hours & Response Times</h4>
                  <p>
                    Available: <strong>Mon–Fri, 9am–6pm</strong><br />
                    Standard reply: <input
                      type="text"
                      value={formData.responseTime}
                      onChange={(e) => handleInputChange(e, 'responseTime')}
                      className={styles.linkInput}
                    /><br />
                    Revision turnaround: <input
                      type="text"
                      value={formData.revisionTurnaround}
                      onChange={(e) => handleInputChange(e, 'revisionTurnaround')}
                      className={styles.linkInput}
                    /><br />
                    Preferred channel: <input
                      type="text"
                      value={formData.preferredChannel}
                      onChange={(e) => handleInputChange(e, 'preferredChannel')}
                      className={styles.linkInput}
                    />
                  </p>
                </div>
              </div>

              <hr className={styles.dd} />
              <div className={styles.dt}>Project Process & Timeline</div>
              <div className={styles.timeline}>
                <div className={styles.tlItem}>
                  <div className={styles.tlNum}>1</div>
                  <div>
                    <div className={styles.tlTitle}>Discovery & Strategy</div>
                    <div className={styles.tlDesc}>Brief review, goals, sitemap planning, and content strategy</div>
                  </div>
                </div>
                <div className={styles.tlItem}>
                  <div className={styles.tlNum}>2</div>
                  <div>
                    <div className={styles.tlTitle}>Wireframes & Structure</div>
                    <div className={styles.tlDesc}>Page structure, layout planning, user flow mapping</div>
                  </div>
                </div>
                <div className={styles.tlItem}>
                  <div className={styles.tlNum}>3</div>
                  <div>
                    <div className={styles.tlTitle}>Design Concepts</div>
                    <div className={styles.tlDesc}>Homepage design, visual direction, and colour palette presented for approval</div>
                  </div>
                </div>
                <div className={styles.tlItem}>
                  <div className={styles.tlNum}>4</div>
                  <div>
                    <div className={styles.tlTitle}>Full Website Design</div>
                    <div className={styles.tlDesc}>All pages designed and sent for client review</div>
                  </div>
                </div>
                <div className={styles.tlItem}>
                  <div className={styles.tlNum}>5</div>
                  <div>
                    <div className={styles.tlTitle}>Development Phase</div>
                    <div className={styles.tlDesc}>Full build — responsive, optimised, content integrated</div>
                  </div>
                </div>
                <div className={styles.tlItem}>
                  <div className={styles.tlNum}>6</div>
                  <div>
                    <div className={styles.tlTitle}>Testing & Quality Check</div>
                    <div className={styles.tlDesc}>Cross-browser, cross-device testing, speed optimisation</div>
                  </div>
                </div>
                <div className={styles.tlItem}>
                  <div className={styles.tlNum}>7</div>
                  <div>
                    <div className={styles.tlTitle}>Final Revisions</div>
                    <div className={styles.tlDesc}>Last round of amends before launch sign-off</div>
                  </div>
                </div>
                <div className={styles.tlItem}>
                  <div className={styles.tlNum}>8</div>
                  <div>
                    <div className={styles.tlTitle}>Launch</div>
                    <div className={styles.tlDesc}>Site goes live — domain connected, final checks completed</div>
                  </div>
                </div>
                <div className={styles.tlItem}>
                  <div className={styles.tlNum}>9</div>
                  <div>
                    <div className={styles.tlTitle}>Post-Launch Support (30 Days)</div>
                    <div className={styles.tlDesc}>Bug fixes, small edits, and training handover if needed</div>
                  </div>
                </div>
              </div>

              <hr className={styles.dd} />
              <div className={styles.dt}>How Revisions Work</div>
              <div className={styles.revisionBox}>
                <div className={styles.bullets}>
                  <div className={styles.bullet}>
                    <div className={styles.bulletDot}>→</div>
                    <div>You receive <strong>3 rounds of revisions</strong> included in your package</div>
                  </div>
                  <div className={styles.bullet}>
                    <div className={styles.bulletDot}>→</div>
                    <div>Submit all feedback in <strong>one consolidated list</strong> per round via portal or email</div>
                  </div>
                  <div className={styles.bullet}>
                    <div className={styles.bulletDot}>→</div>
                    <div>Revisions are turned around within <strong>2 business days</strong></div>
                  </div>
                  <div className={styles.bullet}>
                    <div className={styles.bulletDot}>→</div>
                    <div>Additional revisions beyond included rounds are billed at <strong>$50/hr</strong></div>
                  </div>
                  <div className={styles.bullet}>
                    <div className={styles.bulletDot}>→</div>
                    <div>After final written approval, further changes are treated as a <strong>new maintenance task</strong></div>
                  </div>
                </div>
              </div>

              <div className={styles.dt}>Before We Begin — Client Checklist</div>
              <p className={styles.checklistNote}>Please gather and send us the following before the project starts. Tick each item as you send it.</p>
              <div className={styles.checklist}>
                <div className={styles.checkItem}>
                  <div
                    className={`${styles.checkBox} ${checklist.logo ? styles.checked : ''}`}
                    onClick={() => toggleCheck('logo')}
                  ></div>
                  Logo files (SVG, PNG — transparent background)
                </div>
                <div className={styles.checkItem}>
                  <div
                    className={`${styles.checkBox} ${checklist.branding ? styles.checked : ''}`}
                    onClick={() => toggleCheck('branding')}
                  ></div>
                  Brand colours and fonts (if available)
                </div>
                <div className={styles.checkItem}>
                  <div
                    className={`${styles.checkBox} ${checklist.content ? styles.checked : ''}`}
                    onClick={() => toggleCheck('content')}
                  ></div>
                  All website text / copy content
                </div>
                <div className={styles.checkItem}>
                  <div
                    className={`${styles.checkBox} ${checklist.images ? styles.checked : ''}`}
                    onClick={() => toggleCheck('images')}
                  ></div>
                  Images and media (high resolution)
                </div>
                <div className={styles.checkItem}>
                  <div
                    className={`${styles.checkBox} ${checklist.social ? styles.checked : ''}`}
                    onClick={() => toggleCheck('social')}
                  ></div>
                  Social media profile links
                </div>
                <div className={styles.checkItem}>
                  <div
                    className={`${styles.checkBox} ${checklist.contact ? styles.checked : ''}`}
                    onClick={() => toggleCheck('contact')}
                  ></div>
                  Contact information (phone, email, address)
                </div>
                <div className={styles.checkItem}>
                  <div
                    className={`${styles.checkBox} ${checklist.reference ? styles.checked : ''}`}
                    onClick={() => toggleCheck('reference')}
                  ></div>
                  Reference websites you like (style direction)
                </div>
                <div className={styles.checkItem}>
                  <div
                    className={`${styles.checkBox} ${checklist.hosting ? styles.checked : ''}`}
                    onClick={() => toggleCheck('hosting')}
                  ></div>
                  Domain / hosting login details (if applicable)
                </div>
                <div className={styles.checkItem}>
                  <div
                    className={`${styles.checkBox} ${checklist.guidelines ? styles.checked : ''}`}
                    onClick={() => toggleCheck('guidelines')}
                  ></div>
                  Existing brand guidelines or style guide
                </div>
                <div className={styles.checkItem}>
                  <div
                    className={`${styles.checkBox} ${checklist.integrations ? styles.checked : ''}`}
                    onClick={() => toggleCheck('integrations')}
                  ></div>
                  Third-party integrations needed (booking, forms)
                </div>
              </div>

              <hr className={styles.dd} />
              <div className={styles.dt}>After Launch</div>
              <div className={styles.bullets}>
                <div className={styles.bullet}>
                  <div className={styles.bulletDot}>→</div>
                  <div><strong>Support Period:</strong> You have 30 days of post-launch support — reach out for bugs or small fixes</div>
                </div>
                <div className={styles.bullet}>
                  <div className={styles.bulletDot}>→</div>
                  <div><strong>Handover / Training:</strong> We'll walk you through how to manage and update your site before closing the project</div>
                </div>
                <div className={styles.bullet}>
                  <div className={styles.bulletDot}>→</div>
                  <div><strong>Maintenance Retainer:</strong> Monthly maintenance packages are available — ask us for details</div>
                </div>
                <div className={styles.bullet}>
                  <div className={styles.bulletDot}>→</div>
                  <div><strong>Future Projects:</strong> As a returning client, you receive priority scheduling and preferential rates</div>
                </div>
              </div>
            </div>

            {/* Document Footer */}
            <div className={styles.docFooter}>
              <div className={styles.brand}>{formData.agencyName}</div>
              <div className={styles.conf}>We're excited to work with you</div>
            </div>
          </div>

          {/* Action Row */}
          <div className={styles.actionRow}>
            <button className={styles.btnGold} onClick={handlePrint}>
              ↓ Download PDF
            </button>
            <button className={styles.btnGhost} onClick={() => navigate('/agreement')}>
              ← Back to Agreement
            </button>
          </div>

          {/* Tips Section */}
          <div className={styles.tips}>
            <div className={styles.tip}>
              <div className={styles.tipN}>01</div>
              <h4>Edit directly</h4>
              <p>Click any gold field to type. All fields are live-editable in the browser.</p>
            </div>
            <div className={styles.tip}>
              <div className={styles.tipN}>02</div>
              <h4>Send in order</h4>
              <p>Agreement → Invoice → Welcome builds trust at every step.</p>
            </div>
            <div className={styles.tip}>
              <div className={styles.tipN}>03</div>
              <h4>Download PDF</h4>
              <p>Press Download PDF. Enable "Background graphics" in print settings for dark style.</p>
            </div>
            <div className={styles.tip}>
              <div className={styles.tipN}>04</div>
              <h4>Get it signed</h4>
              <p>Use DocuSign, Adobe Sign, or print and scan. Always keep a signed copy on file.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
