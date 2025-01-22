import { useAppSelector } from "../../redux";

const Profile = () => {
  const profile = useAppSelector((state) => state.auth.user)
  return (
    <>
      <div>cek</div>
    </>
  );
};

export default Profile;
