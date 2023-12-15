import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

import Signin from "@/components/authforms/Signin";

export default async function Login() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/home");
  return <Signin />;
}
