import UserProfile from "../components/UserProfile";

export default function ProfileScreen() {
  return (
    <div>
      <div className="text-center border-b-2 text-xl font-bold fixed p-2 top-16 w-full h-fit bg-white">My Profile</div>
      <UserProfile />
    </div>
  );
}
