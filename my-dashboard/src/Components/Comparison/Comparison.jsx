import React from 'react';
import './Comparison.css'; // we'll add CSS below

const ComparisonTable = ({ comparisonRows }) => {
  // If no data, show a simple message
  if (!comparisonRows || comparisonRows.length === 0) {
    return (
      <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)' }}>
        No comparison data available
      </p>
    );
  }

  return (
    <div className="comparison-section">
      <h2>Compare All Plans</h2>
      
      <div className='scroll-info'>
      <p>( Scroll right side on the table to view more columns )</p>
      </div>


      <div className="comparison-table">
        <div className="table-header">
          <div>Feature</div>
          <div>Basic</div>
          <div>Pro</div>
          <div>Elite</div>
        </div>

        {comparisonRows.map((row, index) => (
          <div key={index} className="table-row">
            <div className="feature-name">{row.feature}</div>
            <div>{row.basic}</div>
            <div className={row.pro !== '—' ? 'highlight' : ''}>
              {row.pro}
            </div>
            <div className={row.elite !== '—' ? 'highlight' : ''}>
              {row.elite}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparisonTable;