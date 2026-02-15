import { ForgotPasswordForm } from "@/components/forms/auth/ForgotPassword";
import { FormPageContainer } from "@/components/layout/FormPageContainer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authHeaderDetails } from "@/lib/data/auth";


export default function ForgotPasswordPage() {
    const { title, description } = authHeaderDetails.forgotPassword;
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
                    <ForgotPasswordForm />
                </CardContent>
            </Card>
        </FormPageContainer>
    )
}
