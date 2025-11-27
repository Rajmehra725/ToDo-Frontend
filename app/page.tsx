import { redirect } from "next/navigation";

export default function Home() {
  redirect("/todos");
  return null; // ye kabhi render nahi hoga
}
