import React from 'react';

export function Timeboxes({ timeboxes, renderTimebox }) {
    return (
        timeboxes.map(renderTimebox)
    );
}

