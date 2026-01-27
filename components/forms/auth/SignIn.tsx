import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/actions/auth";
import { FormField } from "../FormField";

export function SignInForm() {

    return (
        <form action={signIn} className='space-y-4'>
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
                SIGN IN
            </Button>
        </form>
    )
}
