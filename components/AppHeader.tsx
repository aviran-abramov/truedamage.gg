import Link from 'next/link'
import { Navbar } from './Navbar'
import { ModeToggle } from './mode-toggle'

export const AppHeader = () => {
    return (
        <header className="px-6 py-2.5 bg-white dark:bg-slate-900">
            <div className="flex items-center justify-between max-w-7xl m-auto">
                <Link href="/" className="font-extrabold tracking-tight text-xl">TrueDamage.gg</Link>
                <Navbar />
                <ModeToggle />
            </div>
        </header>
    )
}
