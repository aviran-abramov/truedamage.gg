import { Control, Controller } from "react-hook-form";
import { Field, FieldContent, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

interface FormInputFieldProps {
    control: Control<any>;
    name: string;
    title: string;
    type?: string
    placeholder?: string;
}

export const FormInputField = ({
    control,
    name,
    title,
    type = "text",
    placeholder
}: FormInputFieldProps) => {

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldContent>
                        <FieldLabel htmlFor={field.name}>{title}</FieldLabel>
                        <Input
                            type={type}
                            placeholder={placeholder}
                            {...field} id={field.name}
                            aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </FieldContent>
                </Field>
            )}
        />
    )
}