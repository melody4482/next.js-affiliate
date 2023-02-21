import React from 'react'
import Image from 'next/image'

export default function () {
    return (
        <div style={{ margin: '200px auto' }}>
            <Image priority width={60} height={60} alt="dropbox" src={`/dropbox.png`} />
            <p
                style={{
                    marginTop: '-3px',
                    color: 'rgba(255,255,255,0.5)',
                }}
            >
                No Data
            </p>
        </div>
    )
}
