import Profile from "../../features/profile/Profile";
import { useGetCurrentUser } from "../../hooks/profile/useGetCurrentUser";
import Loader from "../../ui/Loader";

export default function UserPage() {
  const { data, isPending } = useGetCurrentUser();

  if (isPending) return <Loader />;

  return (
    <>
      <Profile user={data} />
    </>
  );
}
