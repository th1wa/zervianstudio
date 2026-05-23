import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocumentContext } from '../context/DocumentContext';
import styles from './SetupPage.module.css';

const isLongField = (key) => {
  const longKeys = ['definitions','scopeServices','paymentTerms','clientResponsibilities','timelineClause','revisionsClause','ipOwnership','cancellationClause','refundPolicy','confidentiality','limitationLiability','hostingClause','compatibilityClause','legalCompliance'];
  return longKeys.includes(key) || key.toLowerCase().includes('note') || key.toLowerCase().includes('terms') || key.toLowerCase().includes('clause');
}

export default function SetupPage(){
  const { formData, updateField } = useDocumentContext();
  const navigate = useNavigate();

  const handleChange = (key, e) => {
    updateField(key, e.target.value);
  };

  const keys = Object.keys(formData);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1>Project Setup — Fill placeholders</h1>
        <p className={styles.lead}>Enter your agency, client, project and invoice details here. These values sync across Agreement, Invoice and Welcome pages.</p>

        <div className={styles.grid}>
          {keys.map((key) => (
            <div key={key} className={styles.field}>
              <label className={styles.label}>{key}</label>
              {isLongField(key) ? (
                <textarea className={styles.input} value={formData[key]} onChange={(e)=>handleChange(key,e)} />
              ) : (
                <input className={styles.input} value={formData[key]} onChange={(e)=>handleChange(key,e)} />
              )}
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <button className={styles.btnPrimary} onClick={()=>navigate('/agreement')}>Save & Go to Documents</button>
          <button className={styles.btnGhost} onClick={()=>{localStorage.removeItem('clientAgreementData'); window.location.reload();}}>Reset to defaults</button>
        </div>
      </div>
    </div>
  );
}
