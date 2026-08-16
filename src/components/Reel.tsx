import { useState } from "react";
import { Play, Plus, Heart, MessageCircle, Send, Share2, Check } from "lucide-react";

type ReelData = {
  id: number;
  username: string;
  timeAgo: string;
  caption: string;
};

export default function Reel() {
  const reels: ReelData[] = [
    { id: 1, username: "ernest", timeAgo: "2h ago", caption: "Caption goes here. Add more context, thoughts or description about this reel..." },
    { id: 2, username: "jane_doe", timeAgo: "2h ago", caption: "Caption goes here. Add more context, thoughts or description about this reel..." },
  ];

  return (
    <div style={{ maxWidth: "480px", margin: "0 auto", padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
      {reels.map((reel) => (
        <ReelCard key={reel.id} reel={reel} />
      ))}
    </div>
  );
}

function ReelCard({ reel }: { reel: ReelData }) {
  const [following, setFollowing] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [saved, setSaved] = useState(false);

  function handleLikeClick() {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  }

  return (
    <div
      style={{
        position: "relative",
        aspectRatio: "9 / 16",
        backgroundColor: "#171717",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: "16px", left: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            height: "40px",
            width: "40px",
            borderRadius: "9999px",
            backgroundColor: "#525252",
          }}
        />
        <div>
          <div style={{ color: "white", fontWeight: "bold" }}>{reel.username}</div>
          <div style={{ color: "#d4d4d4", fontSize: "13px" }}>{reel.timeAgo}</div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          height: "64px",
          width: "64px",
          borderRadius: "9999px",
          border: "2px solid white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <Play size={28} color="white" fill="white" />
      </div>

      <div
        style={{
          position: "absolute",
          right: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div
          onClick={() => setFollowing(!following)}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", cursor: "pointer" }}
        >
          <div
            style={{
              height: "36px",
              width: "36px",
              borderRadius: "9999px",
              border: "2px solid white",
              backgroundColor: following ? "#4682B4" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {following ? <Check size={18} color="white" /> : <Plus size={18} color="white" />}
          </div>
          <span style={{ color: "white", fontSize: "12px" }}>Follow</span>
        </div>

        <div
          onClick={handleLikeClick}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", cursor: "pointer" }}
        >
          <Heart size={24} color="white" fill={liked ? "#4682B4" : "none"} />
          <span style={{ color: "white", fontSize: "12px" }}>{likeCount > 0 ? likeCount : "Like"}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", cursor: "pointer" }}>
          <MessageCircle size={24} color="white" />
          <span style={{ color: "white", fontSize: "12px" }}>Comment</span>
        </div>

        <div
          onClick={() => setSaved(!saved)}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", cursor: "pointer" }}
        >
          <Send size={22} color="white" fill={saved ? "#4682B4" : "none"} />
          <span style={{ color: "white", fontSize: "12px" }}>Save</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", cursor: "pointer" }}>
          <Share2 size={22} color="white" />
          <span style={{ color: "white", fontSize: "12px" }}>Share</span>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: "16px", left: "16px", right: "80px", color: "white", fontSize: "14px" }}>
        {reel.caption}
      </div>
    </div>
  );
}
