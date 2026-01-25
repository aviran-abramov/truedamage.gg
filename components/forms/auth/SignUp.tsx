import { Button } from "@/components/ui/button";
import { signUp } from "@/lib/actions/auth";
import { FormField } from "../FormField";

export function SignUpForm() {
    return (
        <form action={signUp} className='space-y-4'>
            <FormField
                name="name"
                label="Username"
                type="text"
                placeholder="johndoe"
            />

            <FormField
                name="email"
                label="Email Address"
                type="email"
                placeholder="johndoe@gmail.com"
            />

            <FormField
                name="password"
                label="Password"
                type="password"
                placeholder="password"
            />

            <Button type="submit" className="w-full cursor-pointer">
                CREATE ACCOUNT
            </Button>
        </form>
    )
}
