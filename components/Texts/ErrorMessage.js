import React from 'react'

const ErrorMessage = ({ children }) => {
    return (
        <span className="text-xs text-red-600">{children}</span>
    )
}

export default ErrorMessage