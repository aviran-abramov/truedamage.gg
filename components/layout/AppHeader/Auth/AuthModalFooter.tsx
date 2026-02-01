import { AuthModalType } from "@/lib/types/auth";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

interface AuthModalFooterProps {
    authModalToShow: AuthModalType;
    onAuthModalToShowClick: (type: AuthModalType) => void;
}

export const AuthModalFooter = ({
    authModalToShow,
    onAuthModalToShowClick
}: AuthModalFooterProps) => {

    return (
        authModalToShow === "signIn" ? (
            <JoinNow onAuthModalToShowClick={onAuthModalToShowClick} />
        ) : (
            <BackToSignIn onAuthModalToShowClick={onAuthModalToShowClick} />
        )
    )
}

interface JoinNowProps {
    onAuthModalToShowClick: (type: AuthModalType) => void;
}

const JoinNow = ({ onAuthModalToShowClick }: JoinNowProps) => {

    return (
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
    )
}

interface BackToSignInProps {
    onAuthModalToShowClick: (type: AuthModalType) => void;
}

const BackToSignIn = ({ onAuthModalToShowClick }: BackToSignInProps) => {

    return (
        <Link
            onClick={() => onAuthModalToShowClick("signIn")}
            href="#"
            className='hover:underline text-blue-400 flex items-center justify-start gap-1 underline-offset-1'
        >
            <ArrowLeft />
            Back to sign in
        </Link>
    )
}