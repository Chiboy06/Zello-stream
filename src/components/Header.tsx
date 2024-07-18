'use client'
import { LogOutIcon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Logo from "./Logo";

function Header() {
    const { onLogout } = useAuth();
  return (
    <div className='flex flex-col '>
        <div className='flex h-24 bg-gray-300 py-2 items-center justify-between px-3'>
            <Logo />
            <div className="px-4 text-red-500 cursor-pointer">
                <LogOutIcon onClick={onLogout} size={24} />
            </div>
        </div>
    </div>
  )
}

export default Header