import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import useStore from "../store/store";

const Header: React.FC = () => {
  const { user } = useStore();

  return (
    <header className="flex justify-between items-center p-4 bg-white relative">
      <div className="text-2xl font-bold">DailyDash.</div>
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <img
              src={user.photos[0].value}
              alt={user.displayName}
              className="w-10 h-10 rounded-full cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-2">
            <div className="p-4">
              <p className="font-bold">{user.displayName}</p>
              <p>{user.emails[0].value}</p>
            </div>
            <DropdownMenuItem
              onClick={() =>
                (window.location.href = "http://localhost:5001/api/auth/logout")
              }
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
};

export default Header;
