import React from 'react';

function WrapSvg({ children }) {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                fill: 'currentcolor',
            }}
        >
            {children}
        </div>
    );
}

export default WrapSvg;
