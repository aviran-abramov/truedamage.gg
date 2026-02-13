import { CreateUserForm } from "@/components/forms/admin/users/create/CreateUser";
import { FormPageContainer } from "@/components/layout/FormPageContainer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateUserPage() {

    return (
        <FormPageContainer>
            <Card>
                <CardHeader>
                    <CardTitle className="text-center text-2xl">Create User</CardTitle>
                    <CardDescription className="text-center">Add a new user to the database</CardDescription>
                </CardHeader>

                <CardContent>
                    <CreateUserForm />
                </CardContent>
            </Card>
        </FormPageContainer>
    )
}