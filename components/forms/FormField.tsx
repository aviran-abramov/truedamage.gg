import Link from "next/link";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { AuthModalType } from "@/lib/types/auth";
import { Button } from "../ui/button";


interface FormFieldProps {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    hasAdditionalButton?: boolean;
    onAuthModalToShowClick?: any; // just for now
    additionalButtonLabel?: string;
}

export const FormField = ({
    name,
    label,
    type = "text",
    placeholder,
    hasAdditionalButton = false,
    onAuthModalToShowClick,
    additionalButtonLabel

}: FormFieldProps) => {

    return (
        <Field className="gap-2.5">
            {hasAdditionalButton ? (
                <div className="flex items-center justify-between px-0.5">
                    <FieldLabel>{label}</FieldLabel>
                    <Link
                        href="#"
                        onClick={() => onAuthModalToShowClick("forgotPassword")}
                        className="text-blue-500 text-sm hover:underline"
                    >
                        {additionalButtonLabel}
                    </Link>
                </div>
            ) : (
                <FieldLabel className="px-0.5">{label}</FieldLabel>
            )}
            <Input
                name={name}
                type={type}
                placeholder={placeholder}
            />
        </Field>
    )
}