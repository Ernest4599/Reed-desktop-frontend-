import { useState } from "react";
import { Plus, Search, Bell, Image, Video, Sparkles, Radio } from "lucide-react";
import CreatePost from "./CreatePost";

type HeaderProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onOpenCreateMoment: () => void;
};

export default function Header({ searchQuery, onSearchChange, onOpenCreateMoment }: HeaderProps) {
  const [createMenuOpen, setCreateMenuOpen] = useState(false);
  const [createPostOpen, setCreatePostOpen] = useState(false);

  function handleCreateClick() {
    setCreateMenuOpen(!createMenuOpen);
  }

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-[#4682B4] bg-white sticky top-0 z-20">
      <div className="flex items-center gap-3 relative">
        <div
          onClick={handleCreateClick}
          className="h-10 w-10 rounded-lg border border-[#4682B4] flex items-center justify-center cursor-pointer"
        >
          <Plus size={20} />
        </div>
        <span className="text-2xl font-bold">Reed</span>

        {createMenuOpen && (
          <div className="absolute left-0 top-12 bg-white border border-[#4682B4] rounded-lg shadow-md w-45 z-10">
            <div
              onClick={() => {
                setCreatePostOpen(true);
                setCreateMenuOpen(false);
              }}
              className="flex items-center gap-2.5 p-3 cursor-pointer"
            >
              <Image size={18} />
              Post
            </div>
            <div
              onClick={() => {
                onOpenCreateMoment();
                setCreateMenuOpen(false);
              }}
              className="flex items-center gap-2.5 p-3 cursor-pointer"
            >
              <Sparkles size={18} />
              Moment
            </div>
            <div className="flex items-center gap-2.5 p-3 cursor-pointer">
              <Video size={18} />
              Reel
            </div>
            <div className="flex items-center gap-2.5 p-3 cursor-pointer">
              <Radio size={18} />
              Live
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 flex-1 max-w-80 ml-6">
        <div className="flex items-center gap-2 border border-[#4682B4] rounded-full px-4 py-2 w-full">
          <Search size={18} color="#94a3b8" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="border-none outline-none w-full text-sm bg-white text-black"
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <Bell size={22} className="cursor-pointer" />
        <div className="h-10 w-10 rounded-full bg-slate-200 cursor-pointer" />
      </div>

      {createPostOpen && <CreatePost onClose={() => setCreatePostOpen(false)} />}
    </div>
  );
}
