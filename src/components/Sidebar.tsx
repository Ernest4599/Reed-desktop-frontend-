import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Video, MessageCircle, User, Sparkles, Bookmark, Sun, Settings } from "lucide-react";

type NavItemData = {
  label: string;
  path: string;
  icon: React.ReactNode;
};

export default function Sidebar() {
  const [lightMode, setLightMode] = useState(true);
  const location = useLocation();

  const navItems: NavItemData[] = [
    { label: "Home", path: "/", icon: <Home size={20} /> },
    { label: "Reel", path: "/reel", icon: <Video size={20} /> },
    { label: "RAI", path: "/rai", icon: <Sparkles size={20} /> },
    { label: "Message", path: "/message", icon: <MessageCircle size={20} /> },
    { label: "Profile", path: "/profile", icon: <User size={20} /> },
    { label: "Saved", path: "/saved", icon: <Bookmark size={20} /> },
    { label: "Settings", path: "/settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="w-[220px] px-4 py-6 flex flex-col gap-1 bg-white sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto">
      {navItems.map((item) => (
        <Link
          key={item.label}
          to={item.path}
          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
            location.pathname === item.path ? "bg-blue-50 text-[#4682B4] font-bold" : "text-black font-normal"
          }`}
        >
          {item.icon}
          <span>{item.label}</span>
        </Link>
      ))}

      <div className="border-t border-slate-200 mt-4 pt-4">
        <div onClick={() => setLightMode(!lightMode)} className="flex items-center justify-between p-3 cursor-pointer">
          <div className="flex items-center gap-3">
            <Sun size={20} />
            <span>Light Mode</span>
          </div>
          <div className={`w-9 h-5 rounded-full relative transition-colors duration-200 ${lightMode ? "bg-[#4682B4]" : "bg-slate-200"}`}>
            <div
              className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200 ${
                lightMode ? "left-[18px]" : "left-0.5"
              }`}
            />
          </div>
        </div>
      </div>

      <div className="p-3 flex flex-col gap-2.5 text-slate-400 text-sm">
        <span className="cursor-pointer">About</span>
        <span className="cursor-pointer">Help</span>
        <span className="cursor-pointer">Privacy</span>
        <span className="cursor-pointer">Terms</span>
      </div>

      <div className="p-3 text-slate-400 text-xs mt-auto">© 2026 Reed. All rights reserved.</div>
    </div>
  );
}
