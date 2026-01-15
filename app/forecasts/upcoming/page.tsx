import { ForecastList } from "@/components/ForecastList"
import Image from "next/image"

const UpcomingForecastsPage = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col items-center">
            <Image src="/lol_banner.webp" alt="Upcoming Matches" width={1416} height={248.16} loading="eager" />

            <ForecastList />
        </div>
    )
}

export default UpcomingForecastsPage