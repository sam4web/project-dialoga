import { Settings } from "lucide-react";
import ProfileCardTitle from "./ProfileCardTitle";
import ThemeToggler from "@/components/ui/ThemeToggler";
import { selectCurrentTheme } from "@/features/theme/slice";
import { useSelector } from "react-redux";

function SettingProfileCard() {
  const theme = useSelector(selectCurrentTheme);

  return (
    <div className="profile-card">
      <ProfileCardTitle title="Privacy & Settings" icon={Settings} />

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <p className="text-color-primary font-medium">Dark Mode</p>
          <p className="text-color-light text-sm">Currently using {theme} theme</p>
        </div>
        <ThemeToggler />
      </div>
    </div>
  );
}

export default SettingProfileCard;
