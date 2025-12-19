import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUserStore } from "@/store/useUserStore";
import { ChevronDown } from "lucide-react";

export default function UserMenu() {
  const user = useUserStore((state) => state.user);

  const initials = user
    ? user.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="flex items-center gap-3 px-6">
    <Avatar className="cursor-pointer">
          <AvatarFallback className="bg-primary text-white">
            {initials}
          </AvatarFallback>
    </Avatar>
          <h3>{user?.fullName || "User"}</h3>
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <ChevronDown/>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-fit">
        <DropdownMenuLabel className="font-medium">
          {user?.email}
        </DropdownMenuLabel>
     </DropdownMenuContent>
    </DropdownMenu>
    </div>
  );
}