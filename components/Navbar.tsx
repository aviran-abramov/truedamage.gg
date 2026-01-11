import Link from "next/link"

export const Navbar = () => {
    return (
        <nav>
            <ul className="flex items-center gap-3">
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/matches">Matches</Link>
                </li>
                <li>
                    <Link href="/forecasts">Forecasts</Link>
                </li>
                <li>
                    <Link href="/articles">Articles</Link>
                </li>
                <li>
                    <Link href="/faq">FAQ</Link>
                </li>
            </ul>
        </nav>
    )
}
