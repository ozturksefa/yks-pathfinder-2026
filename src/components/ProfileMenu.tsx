import { getActiveUserId, getUsers, setActiveUserId, createUser } from "@/lib/storage";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const ProfileMenu = () => {
  const [active, setActive] = useState<string>(getActiveUserId());
  const [users, setUsers] = useState(getUsers());

  useEffect(() => {
    setActive(getActiveUserId());
    setUsers(getUsers());
  }, []);

  const activeName = users.find((u) => u.id === active)?.name || active;

  function handleSwitch(id: string) {
    setActiveUserId(id);
    setActive(id);
  }

  function handleNew() {
    const name = window.prompt("Yeni kullanıcı adı:");
    if (!name) return;
    const u = createUser(name);
    setUsers(getUsers());
    setActive(u.id);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarFallback>{activeName.slice(0,2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline">{activeName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Aktif: {activeName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {users.map((u) => (
          <DropdownMenuItem key={u.id} onClick={() => handleSwitch(u.id)}>
            {u.name}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleNew}>+ Yeni Kullanıcı</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;

