import React from 'react';

export function Edit() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="icon-edit" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap={"round"} strokeLinejoin={"round"}>
            <title>Edit</title>
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
        </svg>
    )
}

export function Trash() {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' className="icon-trash" width="20" width="20" viewBox='0 0 512 512'>
            <title>Remove</title>
            <path d='M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320' fill='none' stroke='currentColor' strokeLinecap={'round'} strokeLinejoin={'round'} strokeWidth={32}/>
            <path stroke='currentColor' strokeLinecap={'round'} strokeMiterlimit={10} strokeWidth={32} d='M80 112h352'/>
            <path d='M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224' fill='none' stroke='currentColor' strokeLinecap={'round'} strokeLinejoin={'round'} strokeWidth={32}/>
        </svg>
    )
}
