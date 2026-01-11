import Image from "next/image";

export default function UpcomingMatchesPage() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col items-center">
            <Image src="/lol_banner.webp" alt="Upcoming Matches" width={1416} height={248.16} />
            <p className="text-2xl mb-4 py-4">Upcoming Matches</p>
        </div>
    )
}