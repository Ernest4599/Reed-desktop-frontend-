import { useState } from "react";
import { Plus, MoreHorizontal, Check, Heart, MessageCircle, Share2, Bookmark } from "lucide-react";

type PostCardProps = {
  username: string;
  timeAgo: string;
  caption: string;
};

export default function PostCard({ username, timeAgo, caption }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [saved, setSaved] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [following, setFollowing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLikeClick() {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  }

  function handleSaveClick() {
    setSaved(!saved);
  }

  function handleFollowClick() {
    setFollowing(!following);
  }

  function handleMenuClick() {
    setMenuOpen(!menuOpen);
  }

  return (
    <div className="border border-[#4682B4] rounded-xl p-4 bg-white relative">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-slate-200" />
        <span className="font-bold">{username}</span>
        <span className="text-slate-400 text-sm">{timeAgo}</span>

        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={handleFollowClick}
            className={`flex items-center justify-center h-7 w-7 rounded-full border border-[#4682B4] cursor-pointer ${
              following ? "bg-[#4682B4] text-white" : "bg-white text-[#4682B4]"
            }`}
          >
            {following ? <Check size={16} /> : <Plus size={16} />}
          </button>

          <div className="relative">
            <MoreHorizontal size={20} className="cursor-pointer" onClick={handleMenuClick} />

            {menuOpen && (
              <div className="absolute right-0 top-7 bg-white border border-[#4682B4] rounded-lg shadow-md w-40 z-10">
                <div className="p-3 cursor-pointer">Report</div>
                <div className="p-3 cursor-pointer">Unfollow</div>
                <div className="p-3 cursor-pointer">Copy link</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="mt-3">{caption}</p>

      <div className="mt-3 aspect-[4/5] bg-slate-100 rounded-lg" />

      <div className="mt-3 flex justify-between">
        <button onClick={handleLikeClick} className={`flex items-center gap-1.5 ${liked ? "text-[#4682B4]" : "text-black"}`}>
          <Heart size={20} fill={liked ? "#4682B4" : "none"} />
          {likeCount}
        </button>
        <button className="flex items-center gap-1.5">
          <MessageCircle size={20} />
          {commentCount}
        </button>
        <button className="flex items-center gap-1.5">
          <Share2 size={20} />
        </button>
        <button onClick={handleSaveClick} className={saved ? "text-[#4682B4]" : "text-black"}>
          <Bookmark size={20} fill={saved ? "#4682B4" : "none"} />
        </button>
      </div>
    </div>
  );
}



