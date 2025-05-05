import React, { useState } from 'react';
import JSZip from 'jszip';
import { registerDataset } from '../utils/registerDataset';

function DatasetUpload() {
  const [fileName, setFileName] = useState('');
  const [licenseMsg, setLicenseMsg] = useState('');
  const [warnings, setWarnings] = useState([]);
  const profanityList = ['badword1', 'badword2']; // Expand this list as needed

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check for bad extensions
    const ext = file.name.split('.').pop().toLowerCase();
    if (['exe', 'bat', 'sh'].includes(ext)) {
      setWarnings([`Blocked file type: ${ext}`]);
      return;
    }

    // Basic content analysis
    if (['txt', 'csv', 'json'].includes(ext)) {
      const text = await file.text();
      const found = profanityList.find(word => text.toLowerCase().includes(word));
      if (found) {
        setWarnings([`Inappropriate content: ${found}`]);
        return;
      }
    }

    // Zip and hash
    const zip = new JSZip();
    zip.file(file.name, file);
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const arrayBuffer = await zipBlob.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    setFileName(file.name);
    setWarnings([]);

    await registerDataset(hashHex);
    setLicenseMsg(`Dataset registered on Solana. Hash: ${hashHex}`);
  };

  return (
    <div style={{ marginTop: '30px' }}>
      <input type="file" onChange={handleFileChange} />
      {fileName && <p>Uploaded: {fileName}</p>}
      {warnings.length > 0 && (
        <div style={{ color: 'red' }}>
          <h4>Warnings:</h4>
          <ul>{warnings.map((w, i) => <li key={i}>{w}</li>)}</ul>
        </div>
      )}
      {licenseMsg && <p>{licenseMsg}</p>}
    </div>
  );
}

export default DatasetUpload;
