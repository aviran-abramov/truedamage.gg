import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/actions/auth";

export function LoginForm() {
    return (
        <form action={login} className='space-y-4'>
            <Field>
                <FieldLabel>Email Address</FieldLabel>
                <Input name="email" type="text" placeholder="johndoe@gmail.com" />
            </Field>

            <Field>
                <FieldLabel>Password</FieldLabel>
                <Input name="password" type="password" placeholder="password" />
            </Field>

            <Button type="submit" className="w-full cursor-pointer">
                LOGIN
            </Button>
        </form>
    )
}
