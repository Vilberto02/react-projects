import type { LucideIcon } from "lucide-react";

export function Skill({
  title,
  Icon,
  isActive,
  onClick,
}: {
  title: string;
  Icon: LucideIcon;
  isActive?: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`flex items-center gap-2 p-3 cursor-pointer hover:bg-red-50/80 rounded-sm transition-all duration-300 ${
        isActive ? "text-red-700" : ""
      }`}
      onClick={onClick}
    >
      <Icon></Icon>
      <p>{title}</p>
    </div>
  );
}
