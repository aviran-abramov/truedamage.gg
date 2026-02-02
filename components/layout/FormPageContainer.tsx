import React from "react"

interface FormPageContainerProps {
    children: React.ReactNode;
}

export const FormPageContainer = ({ children }: FormPageContainerProps) => {

    return (
        <div className="max-w-md mx-auto py-10">
            {children}
        </div>
    )
}