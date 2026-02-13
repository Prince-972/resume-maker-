
import React from 'react';

const EditableText = ({ value, onChange, className, placeholder, style }) => {
    return (
        <div
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onChange(e.target.innerText)}
            className={`outline-none focus:ring-2 focus:ring-blue-300 rounded px-1 min-w-[20px] cursor-text transition-all ${className}`}
            style={style}
            data-placeholder={placeholder}
        >
            {value || ""}
        </div>
    );
};

export default EditableText;
