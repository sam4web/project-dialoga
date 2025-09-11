import { Settings } from "lucide-react";
import ThemeToggler from "@/components/ui/ThemeToggler";
import { selectCurrentTheme } from "@/features/theme/slice";
import { useSelector } from "react-redux";
import Switch from "@/components/ui/Switch";
import CardTitle from "@/components/shared/CardTitlte";

function SettingProfileCard() {
  const theme = useSelector(selectCurrentTheme);

  return (
    <div className="container-card">
      <CardTitle title="Privacy & Settings" icon={Settings} />

      <div className="flex items-center justify-between space-x-3">
        <div className="space-y-0.5">
          <p className="text-color-primary font-medium">Dark Mode</p>
          <p className="text-color-light text-sm">Currently using {theme} theme</p>
        </div>
        <ThemeToggler className="[&>svg]:!size-5" />
      </div>

      <div className="flex items-center justify-between space-x-3">
        <div className="space-y-0.5">
          <p className="text-color-primary font-medium">Read Receipts</p>
          <p className="text-color-light text-sm">Let others know when you've read their messages</p>
        </div>
        <Switch onChange={(value) => console.log(value)} value={true} />
      </div>

      <div className="flex items-center justify-between space-x-3">
        <div className="space-y-0.5">
          <p className="text-color-primary font-medium">Online Status</p>
          <p className="text-color-light text-sm">Show when you're online to your contacts</p>
        </div>
        <Switch onChange={(value) => console.log(value)} />
      </div>

      <div className="flex items-center justify-between space-x-3">
        <div className="space-y-0.5">
          <p className="text-color-primary font-medium">Typing Indicators</p>
          <p className="text-color-light text-sm">Show typing indicators when composing messages</p>
        </div>
        <Switch onChange={(value) => console.log(value)} />
      </div>
    </div>
  );
}

export default SettingProfileCard;
