import { Models } from "appwrite";
import ProfileHeader from "./ProfileHeader";
import ChangeUserInfo from "./ChangeUserInfo";
import ChangeUserNumber from "./ChangeUserNumber";
import ChangePassword from "./ChangePassword";

export default function Profile({
  user,
}: {
  user: Models.Document | undefined;
}) {
  console.log(user);

  return (
    <div className="max-w-[2200px] w-full flex justify-center items-center flex-col gap-2">
      <ProfileHeader user={user} />
      <ChangeUserInfo userId={user?.$id || ""} />
      <ChangePassword />
      <ChangeUserNumber userId={user?.$id || ""} />
    </div>
  );
}
