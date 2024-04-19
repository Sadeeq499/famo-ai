import { UserButton } from "@clerk/nextjs";

const ProfileDropdown = () => {
  return (
    <div>
      <UserButton afterSignOutUrl="/login" />
    </div>
  );
};

export default ProfileDropdown;
