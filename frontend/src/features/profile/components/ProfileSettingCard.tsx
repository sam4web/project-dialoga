import { useState } from "react";
import { Settings } from "lucide-react";
import { useSelector } from "react-redux";
import { IUpdateUserDTO, IUser, IUserSettings } from "../types";
import { selectUserData, sendUpdateUserProfileRequest } from "../slice";
import { useActionWithToast, useDebounceEffect } from "@/hooks";
import { CardTitle, Switch, ThemeToggler } from "@/components";
import { selectCurrentTheme } from "@/app/slices/themeSlice";

interface ISettingItem {
  name: keyof IUserSettings;
  label: string;
  description: string;
}

function ProfileSettingCard() {
  const user = useSelector(selectUserData);
  const theme = useSelector(selectCurrentTheme);
  const { executeAction } = useActionWithToast<IUser, IUpdateUserDTO>();
  const [settings, setSettings] = useState<IUserSettings>({
    readReceipts: user?.settings.readReceipts || false,
    onlineStatus: user?.settings.onlineStatus || false,
    typingIndicator: user?.settings.typingIndicator || false,
  });

  const handleSettingChange = (settingName: string, value: boolean) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [settingName]: value,
    }));
  };

  const handleSettingUpdate = async () => {
    await executeAction({
      action: sendUpdateUserProfileRequest({ settings } as IUpdateUserDTO),
      successMessage: "Settings updated",
    });
  };

  useDebounceEffect(handleSettingUpdate, [JSON.stringify(settings)], 500);

  const settingItems: ISettingItem[] = [
    { name: "readReceipts", label: "Read Receipts", description: "Let others know when you've read their messages" },
    { name: "onlineStatus", label: "Online Status", description: "Show when you're online to your contacts" },
    {
      name: "typingIndicator",
      label: "Typing Indicator",
      description: "Show typing indicators when composing messages",
    },
  ];

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

      {settingItems.map((item) => (
        <div key={item.name} className="flex items-center justify-between space-x-3">
          <div className="space-y-0.5">
            <p className="text-color-primary font-medium">{item.label}</p>
            <p className="text-color-light text-sm">{item.description}</p>
          </div>
          <Switch onChange={(value) => handleSettingChange(item.name, value)} value={settings[item.name]} />
        </div>
      ))}
    </div>
  );
}

export default ProfileSettingCard;
