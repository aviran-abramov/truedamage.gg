import Image from "next/image"

export const PageBanner = () => {

    return (
        <Image
            src="/lol_banner.webp"
            alt="League of legends banner for page"
            width={1416}
            height={248.16}
            loading="eager"
        />
    )
}