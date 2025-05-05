import React from 'react';
import DatasetUpload from './components/DatasetUpload';

function App() {
  return (
    <div style={{ textAlign: 'center', paddingTop: '50px' }}>
      <h1>IndiForge.AI</h1>
      <p>Upload your dataset to register it securely on Solana.</p>
      <DatasetUpload />
    </div>
  );
}

export default App;
