import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/AdminDashboard";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { listGuests } from "@/lib/guest-store";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const guests = await listGuests();

  return <AdminDashboard guests={guests} />;
}
