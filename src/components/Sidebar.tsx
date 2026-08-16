import { useState } from "react";
import { Home, Video, MessageCircle, User, Sparkles, Bookmark, Sun, Settings } from "lucide-react";

type NavItem = "Home" | "Reel" | "RAI" | "Message" | "Profile" | "Saved" | "Settings";

type SidebarProps = {
  activeItem: NavItem;
  onItemClick: (item: NavItem) => void;
};

export default function Sidebar({ activeItem, onItemClick }: SidebarProps) {
  const [lightMode, setLightMode] = useState(true);

  const navItems: { label: NavItem; icon: React.ReactNode }[] = [
    { label: "Home", icon: <Home size={20} /> },
    { label: "Reel", icon: <Video size={20} /> },
    { label: "RAI", icon: <Sparkles size={20} /> },
    { label: "Message", icon: <MessageCircle size={20} /> },
    { label: "Profile", icon: <User size={20} /> },
    { label: "Saved", icon: <Bookmark size={20} /> },
    { label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="w-[220px] px-4 py-6 flex flex-col gap-1 h-full">
      {navItems.map((item) => (
        <div
          key={item.label}
          onClick={() => onItemClick(item.label)}
          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
            activeItem === item.label ? "bg-blue-50 text-[#4682B4] font-bold" : "text-black font-normal"
          }`}
        >
          {item.icon}
          <span>{item.label}</span>
        </div>
      ))}

      <div className="border-t border-[#4682B4] mt-4 pt-4">
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
