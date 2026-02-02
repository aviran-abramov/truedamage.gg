interface PageTitleProps {
    children: string;
}

export const PageTitle = ({ children }: PageTitleProps) => {

    return (
        <p className="text-3xl font-bold mb-4 py-4 text-center">{children}</p>
    )
}