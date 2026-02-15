import { AppContainer } from "@/components/layout/AppContainer";
import { PageTitle } from "@/components/PageTitle";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotAuthorizedPage() {
    return (
        <AppContainer>
            <PageTitle>You are not authorized to view this page</PageTitle>
            <Link
                href="/"
                className='hover:underline text-blue-400 flex items-center justify-start gap-1 underline-offset-1'
            >
                <ArrowLeft />
                <span>Back to sign in</span>
            </Link>
        </AppContainer>
    )
}
