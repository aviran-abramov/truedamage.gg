import { DialogContent } from '@/components/ui/dialog'
import { AuthModalType } from '@/lib/types/auth';
import { AuthModalHeader } from './AuthModalHeader';
import { AuthModalFooter } from './AuthModalFooter';
import { SignInForm } from '../forms/SignInForm';
import { SignUpForm } from '../forms/SignUpForm';
import { ForgotPasswordForm } from '../forms/ForgotPasswordForm';
import { OAuthButtonList } from '../oauth/OAuthButtonList';
import { ContinueWithSeparator } from '../oauth/ContinueWithSeparator';

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
                    <OAuthButtonList />
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

