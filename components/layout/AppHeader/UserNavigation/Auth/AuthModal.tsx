import { ForgotPasswordForm } from '@/components/forms/auth/ForgotPassword';
import { SignInForm } from '@/components/forms/auth/SignIn';
import { SignUpForm } from '@/components/forms/auth/SignUp';
import { ContinueWithSeparator } from '@/components/modals/auth/ContinueWithSeparator';
import { OAuthButtons } from '@/components/modals/auth/OAuthButtons';
import { DialogContent } from '@/components/ui/dialog'
import { AuthModalType } from '@/lib/types/auth';
import { AuthModalHeader } from './AuthModalHeader';
import { AuthModalFooter } from './AuthModalFooter';

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
            <AuthModalHeader authModalToShow={authModalToShow} />

            {authModalToShow !== "forgotPassword" && (
                <>
                    <OAuthButtons />
                    <ContinueWithSeparator />
                </>
            )}

            {authModalToShow === "signIn" && <SignInForm onAuthModalToShowClick={onAuthModalToShowClick} />}
            {authModalToShow === "signUp" && <SignUpForm />}
            {authModalToShow === "forgotPassword" && <ForgotPasswordForm />}

            <AuthModalFooter
                authModalToShow={authModalToShow}
                onAuthModalToShowClick={onAuthModalToShowClick}
            />
        </DialogContent>
    )
}

