import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

import Signup from "@/components/authforms/Signup";
import Nav from "@/components/Nav";

export default async function Register() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/home");
  return (
    <>
      <Nav />
      <Signup />
    </>
  );
}
