import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AuthModalType } from "@/lib/types/auth";

const headerDetails = {
    signIn: {
        title: "Sign in",
        description: "Sign in to your account to continue"
    },
    signUp: {
        title: "Sign up",
        description: "Create your account to get started"
    },
    forgotPassword: {
        title: "Forgot password",
        description: "Type in your email address in the form below to reset your password"
    },
};

interface AuthModalHeaderProps {
    authModalToShow: AuthModalType;
}

export const AuthModalHeader = ({ authModalToShow }: AuthModalHeaderProps) => {
    const { title, description } = headerDetails[authModalToShow];

    return (
        <DialogHeader>
            <DialogTitle className='text-2xl text-center font-bold'>
                {title}
            </DialogTitle>
            <DialogDescription className='text-muted-foreground text-center'>
                {description}
            </DialogDescription>
        </DialogHeader>
    )
}