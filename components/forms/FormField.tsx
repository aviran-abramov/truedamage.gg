import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

interface FormFieldProps {
    name: string;
    label?: string;
    type?: string;
    placeholder?: string;
}

export const FormField = ({ name, label, type = "text", placeholder }: FormFieldProps) => {

    return (
        <Field>
            {label && <FieldLabel>{label}</FieldLabel>}
            <Input name={name} type={type} placeholder={placeholder} />
        </Field>
    )
}