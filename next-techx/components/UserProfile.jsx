"use client";
import { useUserData } from "@/lib/useUserData";

export default function UserProfile() {
  const { loading, user } = useUserData();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>You are not logged in</p>;
  }

  return (
    <div>
      {console.log(user.name, user.email)}
      <h1>User Profile</h1>
      <div>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
}
