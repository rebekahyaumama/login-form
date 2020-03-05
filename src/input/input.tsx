import React from 'react';

export interface InputProps {
    id: string;
    value: string;
    onChange: any;
}
export function Input(props: InputProps) {
    return (
        <input 
            type="text" 
            id={props.id}
            value={props.value} 
            onChange={props.onChange}
            required />
    );
    
}