import { Control, Controller } from "react-hook-form";
import { Field, FieldContent, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import Link from "next/link";

interface FormInputFieldProps {
    control: Control<any>;
    controllerName: string;
    fieldLabel: string;
    type?: string
    placeholder?: string;
    hasAdditionalButton?: boolean;
    onAuthModalToShowClick?: any; // just for now
    additionalButtonLabel?: string;
}

export const FormInputField = ({
    control,
    controllerName,
    fieldLabel,
    type = "text",
    placeholder,
    hasAdditionalButton = false,
    onAuthModalToShowClick,
    additionalButtonLabel
}: FormInputFieldProps) => {

    return (
        <Controller
            name={controllerName}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldContent>
                        {hasAdditionalButton ? (
                            <div className="flex items-center justify-between px-0.5">
                                <FieldLabel htmlFor={field.name}>{fieldLabel}</FieldLabel>
                                <Link
                                    href="#"
                                    onClick={() => onAuthModalToShowClick("forgotPassword")}
                                    className="text-blue-500 text-sm hover:underline"
                                >
                                    {additionalButtonLabel}
                                </Link>
                            </div>
                        ) : (
                            <FieldLabel htmlFor={field.name}>{fieldLabel}</FieldLabel>
                        )}
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
                </Field >
            )}
        />
    )
}