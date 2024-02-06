import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettings as updateSettingsApi } from "../../services/settingsApi/settingsApi";
import toast from "react-hot-toast";
import { SettingsType } from "../../types/types";

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { mutate: updateSettings, isPending } = useMutation({
    mutationFn: ({
      documentId,
      updateData,
    }: {
      documentId: string;
      updateData: SettingsType;
    }) => updateSettingsApi({ documentId, updateData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast.success("Settings successfully updated");
    },
    onError: () => {
      toast.error("Error while updating settings");
    },
  });

  return { updateSettings, isPending };
}
