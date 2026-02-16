import { Separator } from "@/components/ui/separator";

export function ContinueWithSeparator() {

    return (
        <div className='flex items-center gap-4'>
            <Separator className='flex-1' />
            <span className='text-sm text-muted-foreground'>Or continue with</span>
            <Separator className='flex-1' />
        </div>
    )
}