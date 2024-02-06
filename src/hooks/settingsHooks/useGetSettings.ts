import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/settingsApi/settingsApi";

export function useGetSettings() {
  const { data: settings, isPending: isSettingsPending } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { settings, isSettingsPending };
}
