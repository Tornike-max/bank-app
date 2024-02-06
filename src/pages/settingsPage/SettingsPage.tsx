import { Spinner } from "@nextui-org/react";
import Settings from "../../features/settings/Settings";
import { useGetSettings } from "../../hooks/settingsHooks/useGetSettings";

export default function SettingsPage() {
  const { settings, isSettingsPending } = useGetSettings();

  if (isSettingsPending)
    return (
      <div className="flex justify-center items-center py-36">
        <Spinner size="lg" color="primary" />
      </div>
    );

  return (
    <>
      <Settings settings={settings} />
    </>
  );
}
