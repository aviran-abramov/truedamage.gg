import { LinkListItem } from "@/lib/types/navigation";

export const adminCreateLinks: LinkListItem[] = [
    { id: 'new-game', label: 'New Game', href: '/admin/games/create' },
    { id: 'new-team', label: 'New Team', href: '/admin/teams/create' },
    { id: 'new-match', label: 'New Match', href: '/admin/matches/create' },
    { id: 'new-prediction', label: 'New Prediction', href: '/admin/predictions/create' },
];