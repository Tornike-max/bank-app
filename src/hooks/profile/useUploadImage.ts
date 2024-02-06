import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeProfile } from "../../services/profileApi/profileApi";
import toast from "react-hot-toast";

export function useUploadImage() {
  const queryClient = useQueryClient();
  const { mutate: uploadImage, isPending: isUploading } = useMutation({
    mutationFn: ({ userId, file }: { userId: string; file: File }) =>
      changeProfile({ userId, file }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["file"] });
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      queryClient.invalidateQueries({ queryKey: ["acc"] });

      toast.success("Image Successfully uploaded");
    },
    onError: () => {
      toast.error("Error while uploading image");
    },
  });
  return { uploadImage, isUploading };
}
