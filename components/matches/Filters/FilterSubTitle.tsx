interface FilterSubTitleProps {
  children: string;
}

export const FilterSubTitle = ({ children }: FilterSubTitleProps) => {
  return <h5 className="text-lg font-semibold mb-2">{children}</h5>;
};
