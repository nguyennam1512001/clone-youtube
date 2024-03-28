import React from 'react';

function Spinner() {
  return (
    <div className="text-center mt-3 spinner-bottom">
      <div className="spinner-border text-secondary " role="status" style={{ width: '3rem', height: '3rem' }}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Spinner;
