import { login } from "@/lib/actions/auth";
import { Button } from "../ui/button";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

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
