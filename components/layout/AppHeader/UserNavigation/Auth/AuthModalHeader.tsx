import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { authHeaderDetails } from "@/lib/data/auth";
import { AuthModalType } from "@/lib/types/auth";


interface AuthModalHeaderProps {
    authModalToShow: AuthModalType;
}

export const AuthModalHeader = ({ authModalToShow }: AuthModalHeaderProps) => {
    const { title, description } = authHeaderDetails[authModalToShow];

    return (
        <DialogHeader>
            <DialogTitle className='text-2xl text-center font-bold'>
                {title}
            </DialogTitle>
            <DialogDescription className='text-muted-foreground text-center'>
                {description}
            </DialogDescription>
        </DialogHeader>
    )
}