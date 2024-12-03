import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { LinkIcon, LogOutIcon } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(true);

  return (
    <nav className="py-4 flex justify-between items-center">
      {/* LOGO */}
      <Link to="/" className="group">
        <img
          src="/logo.png"
          alt="Sharpener Logo"
          className="h-16 w-16 rounded-full shadow-[0_0_10px_5px_rgba(255,255,255,0.5)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
        />
      </Link>

      {/* Login / user dropdown */}
      <div>
        {!user ? (
          <Button onClick={() => navigate('/auth')} className="mr-4">
            Login
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Ashish Jaguar</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LinkIcon className="mr-2 h-4 w-4" />
                <span>My Links</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-800">
                <LogOutIcon className="mr-2 h-4 w-4" />
                <span>LogOut</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
};

export default Header;
