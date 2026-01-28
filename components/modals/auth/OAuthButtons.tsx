import { OAuthButton } from "./OAuthButton";

export function OAuthButtons() {

    return (
        <div className="space-y-2.5">
            <OAuthButton name='Google' provider='google' />
            <OAuthButton name="Facebook" provider='facebook' />
        </div>
    )
}