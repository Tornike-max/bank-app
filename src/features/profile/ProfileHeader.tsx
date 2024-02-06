import { Button, Input, Spinner } from "@nextui-org/react";
import { Models } from "appwrite";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUploadImage } from "../../hooks/profile/useUploadImage";

type ImageType = {
  image: File[];
};

export default function ProfileHeader({
  user,
}: {
  user: Models.Document | undefined;
}) {
  const { register, handleSubmit } = useForm<ImageType>();
  const { uploadImage, isUploading } = useUploadImage();

  const onSubmit: SubmitHandler<ImageType> = (data) => {
    const imageFile = data.image[0];
    console.log(imageFile);
    const newData = {
      userId: user?.$id || "",
      file: imageFile,
    };
    uploadImage(newData);
  };
  return (
    <div className="w-full flex justify-between items-center bg-stone-100 py-6 rounded-lg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-full flex justify-center items-center flex-col gap-4 px-4"
      >
        <div className="flex items-center justify-between gap-2">
          <img
            src={user?.imageUrl}
            alt="user img"
            className="rounded-full border-3 w-10 h-10 sm:w-12 sm:h-12"
          />
          <div className="w-full flex justify-center items-start flex-col text-sm lg:text-base">
            <span>User</span>
            <span>{user?.name}</span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <Input
            type="file"
            placeholder="Change Image"
            variant="bordered"
            color="primary"
            size="sm"
            {...register("image", {
              required: true,
            })}
          />
          <Button type="submit" size="md" variant="ghost" color="primary">
            {isUploading ? <Spinner /> : "Change"}
          </Button>
        </div>
      </form>
    </div>
  );
}
