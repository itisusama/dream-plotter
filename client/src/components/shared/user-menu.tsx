import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
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
    <div className="flex items-center gap-3 absolute top-4 right-4 bg-primary/30 px-6 py-2 rounded-full border border-t-0 border-l-0 border-b-2 border-r-2">
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