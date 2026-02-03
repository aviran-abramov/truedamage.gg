interface PageTitleProps {
    children: string;
    className?: string;
}

export const PageTitle = ({ children, className }: PageTitleProps) => {

    return (
        <h2 className={`text-4xl font-bold mb-4 text-left ${className}`}>{children}</h2>
    )
}