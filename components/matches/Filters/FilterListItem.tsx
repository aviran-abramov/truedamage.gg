import { Button } from "@/components/ui/button";
import Image from "next/image";

type ButtonType = "X" | "+";

interface FilterListItemProps {
  id: string;
  type: ButtonType;
  itemLabel: string;
  itemName: string;
  iconUrl?: string;
  onClick: (itemId: string) => void;
}

export function FilterListItem({
  id,
  type,
  itemLabel,
  itemName,
  iconUrl,
  onClick,
}: FilterListItemProps) {
  return (
    <li>
      <Button
        variant={"outline"}
        className="cursor-pointer rounded-sm"
        onClick={() => onClick(id)}
      >
        <span className={`${type === "+" ? "dark:invert" : ""}`}>
          {type === "+" ? "➕" : "✕"}
        </span>
        <Image
          className="dark:invert"
          src={iconUrl || "/icons/x.png"}
          alt={`${itemName} logo`}
          height={20}
          width={20}
        />
        <span>{itemLabel}</span>
      </Button>
    </li>
  );
}
