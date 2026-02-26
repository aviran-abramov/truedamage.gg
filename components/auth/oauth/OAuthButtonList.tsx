import { OAuthButton } from "./OAuthButton";

export function OAuthButtonList() {
  return (
    <div className="space-y-2.5">
      <OAuthButton name="Google" provider="google" />
      {/* FB Disabled - Verification Needed */}
      {/* <OAuthButton name="Facebook" provider="facebook" /> */}
    </div>
  );
}
