import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Calendar as CalendarIcon, Plus, User, LogOut } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchEvents from "@/components/calendar/SearchEvents"; // NEW!

interface HeaderProps {
  onOpenCreateEvent: (date?: Date) => void;
  events: any[]; // NEW: pass events
  onSelectEvent: (event: any) => void; // NEW: pass handler
}

const Header: React.FC<HeaderProps> = ({ onOpenCreateEvent, events, onSelectEvent }) => {
  const isMobile = useIsMobile();
  const { user, logout } = useKindeAuth();

  return (
    <header className="border-b border-border bg-background px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {isMobile && (
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <CalendarIcon className="h-6 w-6 text-calendar-primary" />
        <h1 className="text-xl font-semibold hidden sm:block">CalendarPlus</h1>
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2">
        <div className="relative w-[200px] lg:w-[300px]">
          <SearchEvents events={events} onEventSelect={onSelectEvent} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="md:hidden">
          {/* Mobile Search Icon (optional) */}
        </Button>
        <ThemeToggle />
        
        {/* Create Button */}
        <Button 
          variant="default" 
          size="sm" 
          className="gap-1"
          onClick={() => onOpenCreateEvent()}
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Create</span>
        </Button>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => logout()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
