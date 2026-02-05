interface FilterTitleProps {
    children: string;
}

export const FilterTitle = ({ children }: FilterTitleProps) => {

    return <h4 className="text-2xl font-semibold mb-2">{children}</h4>
}