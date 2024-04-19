import { checkRole } from "@/utils/roles";
import { UserProfile } from "@clerk/nextjs";
import AddNewUser from "./Components/addNewUser";
import GetAllUser from "./Components/getAllUser";

const Settings = async () => {
  return (
    <div>
      {checkRole("admin") && (
        <>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-3xl font-bold">Users</p>
            <AddNewUser />
          </div>
          <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
            <GetAllUser />
          </div>
        </>
      )}
      <UserProfile />
    </div>
  );
};

export default Settings;
