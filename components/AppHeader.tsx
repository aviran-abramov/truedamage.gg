
import Link from 'next/link'
import { Navbar } from './Navbar'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogFooter, DialogHeader } from './ui/dialog'
import { UserIcon } from 'lucide-react'
import { Field, FieldLabel } from './ui/field'
import { Input } from './ui/input'

export const AppHeader = () => {
    // TODO: Replace with better-auth session check
    const isAdmin = true;

    return (
        <header className="border-b">
            <UserBar />
            {isAdmin && <AdminBar />}
        </header>
    )
}

const UserBar = () => {
    return (
        <div className='border-b px-6 py-2.5 bg-[#F1F1F5] dark:bg-slate-900 shadow-md'>
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <Link href="/" className="font-extrabold tracking-tight text-xl">TrueDamage.gg</Link>
                <Navbar />

                <div className='flex items-center gap-1'>
                    <ModeToggle />
                    <AuthButton />
                </div>
            </div>
        </div>
    )
}

const AuthButton = () => {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="cursor-pointer">
                    <UserIcon />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-2xl font-bold'>Login</DialogTitle>
                    {/* <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription> */}
                </DialogHeader>
                <form action="" className='space-y-4'>
                    <Field>
                        <FieldLabel>Email Address</FieldLabel>
                        <Input name="email" type="text" placeholder="johndoe@gmail.com" />
                    </Field>

                    <Field>
                        <FieldLabel>Password</FieldLabel>
                        <Input name="password" type="password" placeholder="password" />
                    </Field>

                    <Button type="submit" className="w-full cursor-pointer">
                        LOGIN
                    </Button>
                </form>

                <div className='flex items-center justify-center'>
                    <p>Not a member?</p>
                    <Link href="#" className='hover:underline text-blue-400 ml-1'>Join now</Link>
                </div>
            </DialogContent>
        </Dialog>
    )
}

const adminLinks = [
    { href: '/admin/games/create', label: 'New Game' },
    { href: '/admin/teams/create', label: 'New Team' },
    { href: '/admin/matches/create', label: 'New Match' },
    { href: '/admin/forecasts/create', label: 'New Forecast' },
];

const AdminBar = () => {

    return (
        <div className='px-6 py-0.5 bg-red-400 dark:bg-red-900 border-b shadow-md'>
            <div className='flex items-center max-w-7xl mx-auto'>
                <h2 className='text-md font-semibold'>Admin Panel</h2>

                <ul className='flex items-center gap-2 ml-4'>
                    {adminLinks.map((link) => (
                        <li key={link.href}>
                            <Button variant="link" asChild className="px-0 font-semibold">
                                <Link href={link.href} className="px-0">{link.label}</Link>
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}