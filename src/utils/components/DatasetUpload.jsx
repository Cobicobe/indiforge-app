import React, { useState } from 'react';

function DatasetUpload() {
  const [fileName, setFileName] = useState('');
  const [licenseMsg, setLicenseMsg] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setLicenseMsg('');
    }
  };

  const handleGenerateLicense = () => {
    if (!fileName) {
      setLicenseMsg('Please upload a dataset first.');
    } else {
      setLicenseMsg(`✅ License generated for dataset: ${fileName}`);
    }
  };

  return (
    <div style={{ marginTop: '30px' }}>
      <input type="file" onChange={handleFileChange} />
      {fileName && <p>📁 Uploaded: <strong>{fileName}</strong></p>}

      <button onClick={handleGenerateLicense} style={{ marginTop: '10px' }}>
        Generate License
      </button>

      {licenseMsg && <p style={{ marginTop: '10px' }}>{licenseMsg}</p>}
    </div>
  );
}

export default DatasetUpload;
