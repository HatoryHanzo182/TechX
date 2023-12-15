"use client";
import * as React from "react";
import Nav from "@/components/Navlogged";
import NavBar from "@/components/Navnotlogged";

export default function Home() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  return <>{loggedIn ? <Nav /> : <NavBar />}</>;
}
