import { auth } from "@/auth";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated"
import { redirect } from "next/navigation";

export default async function Home() {
  const isAuthenticated = await checkIsAuthenticated();
  if (!isAuthenticated) {
    redirect("/auth/sign-in");
  }
  const session = await auth();
  return (
    <main className="min-h-screen ">
      <p>{session.user.email}</p>
      <p>{session.user.name}</p>
      home page
    </main>
  )
}
