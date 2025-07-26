import { LucideIcon } from "lucide-react";

type Props = { title: string; icon: LucideIcon };

function CardTitle({ title, icon: Icon }: Props) {
  return (
    <h3 className="header-text text-xl sm:text-2xl flex items-center gap-2 sm:gap-3">
      <Icon className="size-5 sm:size-6" /> {title}
    </h3>
  );
}

export default CardTitle;
