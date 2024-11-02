import React from 'react';

function TableCheckbox({ tableNumber, description, onChange }) {
  return (
    <div className="table-checkbox">
      <input type="checkbox" id={`table-${tableNumber}`} onChange={() => onChange(tableNumber)} />
      <div>
        <h2>Table Number {tableNumber}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default TableCheckbox;
