import React from "react"

interface AppContainerProps {
    children: React.ReactNode;
}

export const AppContainer = ({ children }: AppContainerProps) => {

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col items-center">
            {children}
        </div>
    )
}