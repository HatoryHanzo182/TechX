import { useSession } from "next-auth/react";

export const useUserData = () => {
  const { data: session, status } = useSession();

  const getData = () => {
    if (status === "loading") {
      return { loading: true, user: null };
    }

    if (status === "authenticated") {
      return { loading: false, user: session.user };
    }

    return { loading: false, user: null };
  };

  return { ...getData() };
};
