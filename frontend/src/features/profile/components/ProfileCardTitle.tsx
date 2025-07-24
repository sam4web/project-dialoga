import { LucideIcon } from "lucide-react";

type Props = { title: string; icon: LucideIcon };

function ProfileCardTitle({ title, icon: Icon }: Props) {
  return (
    <h3 className="header-text text-2xl flex items-center gap-3">
      <Icon className="size-6" /> {title}
    </h3>
  );
}

export default ProfileCardTitle;
