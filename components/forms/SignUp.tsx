import { signUp } from "@/lib/actions/auth";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function SignUpForm() {
    return (
        <form action={signUp} className='space-y-4'>
            <Field>
                <FieldLabel>Username</FieldLabel>
                <Input name="name" type="text" placeholder="johndoe" />
            </Field>

            <Field>
                <FieldLabel>Email Address</FieldLabel>
                <Input name="email" type="text" placeholder="johndoe@gmail.com" />
            </Field>

            <Field>
                <FieldLabel>Password</FieldLabel>
                <Input name="password" type="password" placeholder="password" />
            </Field>

            <Button type="submit" className="w-full cursor-pointer">
                CREATE ACCOUNT
            </Button>
        </form>
    )
}
