import { Button } from "@/components/ui/button";
import { login } from "@/lib/actions/auth";
import { FormField } from "../FormField";

export function LoginForm() {
    return (
        <form action={login} className='space-y-4'>
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
                LOGIN
            </Button>
        </form>
    )
}
