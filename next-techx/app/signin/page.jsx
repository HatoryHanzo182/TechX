import { redirect } from "next/navigation";

import Signin from "@/components/authforms/Signin";
import Nav from "@/components/Nav";

export default async function Login() {
  //   const session = await getServerSession();

  //   if (session) redirect("/home");
  return (
    <>
      <Nav />
      <Signin />
    </>
  );
}
