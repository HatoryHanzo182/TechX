import { useSession } from "next-auth/react";

export const useUserData = () => {
  const { data: session, status } = useSession();

  const getData = () => {
    if (status === "loading") {
      return { loading: true, user_gouth: null };
    }

    if (status === "authenticated") {
      return { loading: false, user_gouth: session.user };
    }

    return { loading: false, user_gouth: null };
  };

  return { ...getData() };
};
