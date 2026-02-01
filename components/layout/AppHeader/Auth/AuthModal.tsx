import { ForgotPasswordForm } from '@/components/forms/auth/ForgotPassword';
import { SignInForm } from '@/components/forms/auth/SignIn';
import { SignUpForm } from '@/components/forms/auth/SignUp';
import { ContinueWithSeparator } from '@/components/modals/auth/ContinueWithSeparator';
import { OAuthButtons } from '@/components/modals/auth/OAuthButtons';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { AuthModalType } from '@/lib/types/auth';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface AuthModalProps {
    authModalToShow: AuthModalType;
    onAuthModalToShowClick: (type: AuthModalType) => void;
}

export function AuthModal({
    authModalToShow,
    onAuthModalToShowClick
}: AuthModalProps) {
    return (
        <DialogContent>
            <AuthModalDialogHeader authModalToShow={authModalToShow} />

            {authModalToShow !== "forgotPassword" && (
                <>
                    <OAuthButtons />
                    <ContinueWithSeparator />
                </>
            )}

            {authModalToShow === "signIn" && <SignInForm onAuthModalToShowClick={onAuthModalToShowClick} />}
            {authModalToShow === "signUp" && <SignUpForm />}
            {authModalToShow === "forgotPassword" && <ForgotPasswordForm />}

            <AuthModalDialogFooter
                authModalToShow={authModalToShow}
                onAuthModalToShowClick={onAuthModalToShowClick}
            />
        </DialogContent>
    )
}


interface AuthModalDialogHeaderProps {
    authModalToShow: "signIn" | "signUp" | "forgotPassword";
}

const AuthModalDialogHeader = ({ authModalToShow }: AuthModalDialogHeaderProps) => {
    let title;
    let description;

    if (authModalToShow === "signIn") {
        title = "Sign in";
        description = "Sign in to your account to continue";
    }

    if (authModalToShow === "signUp") {
        title = "Sign up";
        description = "Create your account to get started";
    }

    if (authModalToShow === "forgotPassword") {
        title = "Forgot password"
        description = "Type in your email address in the form below to reset your password";
    }

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

interface AuthModalDialogFooterProps {
    authModalToShow: AuthModalType;
    onAuthModalToShowClick: (type: AuthModalType) => void;
}

const AuthModalDialogFooter = ({
    authModalToShow,
    onAuthModalToShowClick
}: AuthModalDialogFooterProps) => {

    return (
        authModalToShow === "signIn" ? (
            <div className='flex items-center justify-center gap-1'>
                <p>Not a member?</p>
                <Link
                    onClick={() => onAuthModalToShowClick("signUp")}
                    href="#"
                    className='hover:underline text-blue-400 flex items-center justify-end gap-1 underline-offset-1'
                >
                    Join now
                    <ArrowRight />
                </Link>
            </div>
        ) : (
            <Link
                onClick={() => onAuthModalToShowClick("signIn")}
                href="#"
                className='hover:underline text-blue-400 flex items-center justify-start gap-1 underline-offset-1'
            >
                <ArrowLeft />
                Back to sign in
            </Link>
        )
    )
}