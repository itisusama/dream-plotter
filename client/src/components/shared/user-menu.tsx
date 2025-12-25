import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import { ui } from "@/imports/ui";

export default function UserMenu() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const initials = user
    ? user.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="flex items-center gap-3">
    <ui.DropdownMenu>
      <ui.DropdownMenuTrigger className="outline-none">
        <ui.Avatar className="cursor-pointer">
          <ui.AvatarFallback className="bg-primary text-white">
            {initials}
          </ui.AvatarFallback>
        </ui.Avatar>
      </ui.DropdownMenuTrigger>

      <ui.DropdownMenuContent align="end" className="w-fit">
        <ui.DropdownMenuLabel className="font-medium">
          {user?.fullName || "User"}
        </ui.DropdownMenuLabel>
        <ui.DropdownMenuLabel className="font-medium">
          {user?.email}
        </ui.DropdownMenuLabel>
      
        <ui.DropdownMenuItem onClick={handleLogout} className="text-red-600">
          Logout
        </ui.DropdownMenuItem>
      </ui.DropdownMenuContent>
    </ui.DropdownMenu>
    </div>
  );
}