import { Outlet, Navigate } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import { Navbar } from "@/components/navbar";

export default function DashboardLayout() {
  const { user, hydrated } = useUserStore();

  if (!hydrated) {
    return null;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
        <Navbar/>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
