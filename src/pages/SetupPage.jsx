import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocumentContext } from '../context/DocumentContext';
import styles from './SetupPage.module.css';

const GROUPS = [
  { id: 'agency', label: 'Agency', keys: ['agencyName','agencyCompany','agencyAddress','agencyEmail','agencyPhone','agencyRegNo','assignedContact'] },
  { id: 'client', label: 'Client', keys: ['clientName','clientBusiness','clientAddress','clientEmail','clientPhone'] },
  { id: 'project', label: 'Project', keys: ['projectName','packageSelected','totalValue','startDate','estCompletion'] },
  { id: 'invoice', label: 'Invoice', keys: ['invoiceNo','documentRef','agreementRef','poReference','dueDate','currency','subtotal','tax','discount','projectTotal','depositReceived','balanceDue'] },
  { id: 'payment', label: 'Payment', keys: ['bankName','accountName','accountNo','ibanSwift','stripeLink','paypalLink'] },
  { id: 'welcome', label: 'Welcome / Links', keys: ['signedAgreementLink','invoiceLink','clientPortalLink','fileDeliveryLink','responseTime','revisionTurnaround','preferredChannel'] },
  { id: 'clauses', label: 'Agreement Clauses', keys: ['definitions','scopeServices','paymentTerms','clientResponsibilities','timelineClause','revisionsClause','ipOwnership','cancellationClause','refundPolicy','confidentiality','limitationLiability','hostingClause','compatibilityClause','legalCompliance'] }
];

function isLongField(key){
  return key.length > 20 || key.toLowerCase().includes('terms') || key.toLowerCase().includes('clause') || key.toLowerCase().includes('definitions') || key.toLowerCase().includes('scope');
}

export default function SetupPage(){
  const { formData, updateField, updateFields } = useDocumentContext();
  const navigate = useNavigate();
  const [open, setOpen] = useState(() => GROUPS.reduce((acc,g)=>{ acc[g.id]=true; return acc; },{}));

  const handleChange = (key, value) => updateField(key, value);

  const toggle = (id) => setOpen(prev => ({...prev, [id]: !prev[id]}));

  const saveAndGo = () => navigate('/agreement');

  const resetAll = () => { localStorage.removeItem('clientAgreementData'); window.location.reload(); };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1>Project Setup</h1>
        <p className={styles.lead}>Fill the grouped fields below — values sync across Agreement, Invoice and Welcome pages automatically.</p>

        <div className={styles.groups}>
          {GROUPS.map(group => (
            <div key={group.id} className={styles.group}>
              <button className={styles.groupHeader} onClick={()=>toggle(group.id)}>
                <span>{group.label}</span>
                <span className={styles.caret}>{open[group.id] ? '−' : '+'}</span>
              </button>

              {open[group.id] && (
                <div className={styles.groupBody}>
                  {group.keys.map(key => (
                    <div key={key} className={styles.fieldRow}>
                      <label className={styles.label}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}</label>
                      {isLongField(key) ? (
                        <textarea className={styles.input} value={formData[key]||''} onChange={(e)=>handleChange(key,e.target.value)} />
                      ) : (
                        <input className={styles.input} value={formData[key]||''} onChange={(e)=>handleChange(key,e.target.value)} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <button className={styles.btnPrimary} onClick={saveAndGo}>Save & Go to Documents</button>
          <button className={styles.btnGhost} onClick={resetAll}>Reset to defaults</button>
        </div>
      </div>
    </div>
  );
}
