import { SignInForm } from "@/components/forms/auth/SignIn";
import { FormPageContainer } from "@/components/layout/FormPageContainer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authHeaderDetails } from "@/lib/data/auth";


export default function SignInPage() {
    const { title, description } = authHeaderDetails.signIn;

    return (
        <FormPageContainer>
            <Card>
                <CardHeader>
                    <CardTitle className="text-center text-2xl">
                        {title}
                    </CardTitle>
                    <CardDescription className="text-center">
                        {description}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <SignInForm additionalButtonHref="/forgot-password" />
                </CardContent>
            </Card>
        </FormPageContainer>
    )
}
