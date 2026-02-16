import { SignUpForm } from "@/components/auth/forms/SignUpForm";
import { FormPageContainer } from "@/components/layout/FormPageContainer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authHeaderDetails } from "@/lib/data/auth";


export default function SignUpPage() {
    const { title, description } = authHeaderDetails.signUp;

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
                    <SignUpForm />
                </CardContent>
            </Card>
        </FormPageContainer>
    )
}