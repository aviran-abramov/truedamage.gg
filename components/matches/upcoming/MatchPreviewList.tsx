import { MatchWithRelations } from "@/lib/actions/matches";
import { MatchPreview } from "./MatchPreview";

interface MatchPreviewListProps {
    matches: MatchWithRelations[];
}

export const MatchPreviewList = ({ matches = [] }: MatchPreviewListProps) => {

    return (
        <ul className="col-span-8 flex flex-col gap-2 w-full">
            {matches.map((match) => (
                <MatchPreview
                    key={match.id}
                    match={match}
                />
            ))}
        </ul>
    )
}