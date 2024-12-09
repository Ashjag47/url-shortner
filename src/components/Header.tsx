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
import { UrlState } from '@/context';
import useFetch from '@/hooks/use-fetch';
import { logout } from '@/utils/apiAuth';
import { PacmanLoader } from 'react-spinners';

const Header = () => {
  const navigate = useNavigate();
  const { user, fetchUser } = UrlState();

  const { loading, fn: fnLogout } = useFetch(logout);

  const handleLogout = async () => {
    await fnLogout();
    fetchUser();
  };

  return (
    <>
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
                  <AvatarImage
                    src={user.user_metadata?.profilePic}
                    className="object-contain"
                  />
                  <AvatarFallback>
                    {user.user_metadata?.name
                      ? user.user_metadata?.name.split(' ')[0][0] +
                        user.user_metadata?.name.split(' ')[1][0]
                      : user?.email?.[0].toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {user.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/dashboard" className="flex">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    <span>My Links</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-800">
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  <span onClick={handleLogout}>LogOut</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <PacmanLoader color="#36d7b7" size={50} />
        </div>
      )}
    </>
  );
};

export default Header;
