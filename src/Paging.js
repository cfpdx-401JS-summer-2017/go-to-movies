import React from 'react';


export function PagingButton({onClick, incr, label }) {
  return (
    <button onClick={() => onClick(incr)}>
      {label}
    </button>
  );
}