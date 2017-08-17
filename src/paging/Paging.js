import React from 'react';

export function PagingButton({ onClick, incr, label, disabled }) {
    return (
        <button disabled={disabled} onClick={() => onClick(incr)}>
            {label}
        </button>
    );
}

