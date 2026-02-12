import { Control, Controller } from "react-hook-form";
import { Field, FieldContent, FieldError, FieldLabel } from "../ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

interface SelectOption {
    id: string;
    label: string;
    value: string;
}

interface FormSelectFieldProps {
    control: Control<any>;
    controllerName: string;
    fieldLabel: string;
    selectLabel: string;
    items: SelectOption[];
    placeholder?: string;
}

export const FormSelectField = ({
    control,
    controllerName,
    fieldLabel,
    selectLabel,
    items,
    placeholder
}: FormSelectFieldProps) => {

    return (
        <Controller
            name={controllerName}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldContent>
                        <FieldLabel htmlFor={field.name}>{fieldLabel}</FieldLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>{selectLabel}</SelectLabel>
                                    {items.map((item) => (
                                        <SelectItem key={item.id} value={item.value}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </FieldContent>
                </Field>
            )}
        />
    )
}