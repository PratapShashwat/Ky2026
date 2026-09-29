import { redirect } from "next/navigation";
import { auth } from "@/lib/api/auth";
import { ProfilePageContent } from "@/components/pages/profile/ProfilePageContent";

export const metadata = {
  title: "Profile | Kashi Yatra 2027",
  description: "Your profile on Kashi Yatra 2027",
};

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return <ProfilePageContent user={session.user} />;
}
