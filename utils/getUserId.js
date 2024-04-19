import { auth } from "@clerk/nextjs";

const getUserId = () => {
  const { userId } = auth();

  return userId;
};

export default getUserId;
