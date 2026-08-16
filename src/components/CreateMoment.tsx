import { useState, useRef } from "react";
import { X, Play, Sparkles, Music, Type, Image, Trash2 } from "lucide-react";

type MomentOption = "effects" | "sound" | "text" | "media" | null;

type CreateMomentProps = {
  onClose: () => void;
};

export default function CreateMoment({ onClose }: CreateMomentProps) {
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [activeOption, setActiveOption] = useState<MomentOption>(null);
  const [caption, setCaption] = useState("");
  const [audience, setAudience] = useState("Public");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function toggleOption(option: MomentOption) {
    setActiveOption(activeOption === option ? null : option);
  }

  function handleMediaChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setMediaPreview(URL.createObjectURL(file));
    }
  }

  function handleShare() {
    console.log("Sharing moment:", { mediaPreview, caption, audience });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#4682B4]">
        <button onClick={onClose}>
          <X size={22} />
        </button>
        <span className="font-bold text-lg">Create Moment</span>
        <button onClick={handleShare} className="text-[#4682B4] font-bold">
          Post
        </button>
      </div>

      <div className="flex-1 overflow-y-auto max-w-2xl w-full mx-auto p-6">
        <input type="file" accept="image/*,video/*" ref={fileInputRef} onChange={handleMediaChange} className="hidden" />

        <div
          onClick={() => !mediaPreview && fileInputRef.current?.click()}
          className="relative aspect-[4/5] bg-slate-50 border border-[#4682B4] rounded-xl flex flex-col items-center justify-center cursor-pointer overflow-hidden"
        >
          {mediaPreview ? (
            <>
              <img src={mediaPreview} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full border-2 border-white flex items-center justify-center bg-black/20">
                  <Play size={28} color="white" fill="white" />
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMediaPreview(null);
                }}
                className="absolute top-3 right-3 bg-white rounded-full p-1.5 border border-[#4682B4]"
              >
                <Trash2 size={16} />
              </button>
            </>
          ) : (
            <>
              <div className="h-16 w-16 rounded-full border-2 border-[#4682B4] flex items-center justify-center">
                <Play size={28} color="#4682B4" fill="#4682B4" />
              </div>
              <span className="mt-3 text-slate-400 font-bold">Photo / Video Preview</span>
            </>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <button
            onClick={() => toggleOption("effects")}
            className={`flex items-center gap-2 border rounded-lg px-4 py-3 ${activeOption === "effects" ? "border-[#4682B4] bg-blue-50" : "border-[#4682B4]"}`}
          >
            <Sparkles size={18} />
            Effects
          </button>
          <button
            onClick={() => toggleOption("sound")}
            className={`flex items-center gap-2 border rounded-lg px-4 py-3 ${activeOption === "sound" ? "border-[#4682B4] bg-blue-50" : "border-[#4682B4]"}`}
          >
            <Music size={18} />
            Sound
          </button>
          <button
            onClick={() => toggleOption("text")}
            className={`flex items-center gap-2 border rounded-lg px-4 py-3 ${activeOption === "text" ? "border-[#4682B4] bg-blue-50" : "border-[#4682B4]"}`}
          >
            <Type size={18} />
            Text
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 border border-[#4682B4] rounded-lg px-4 py-3"
          >
            <Image size={18} />
            Add media
          </button>
        </div>

        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Add a caption..."
          className="w-full mt-4 border border-[#4682B4] rounded-lg p-3 outline-none resize-none"
          rows={3}
        />

        <div className="mt-4 flex items-center justify-between">
          <span className="text-slate-400 text-sm">Who can see this Moment?</span>
          <select
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            className="border border-[#4682B4] rounded-lg px-3 py-1.5 text-sm outline-none"
          >
            <option>Public</option>
            <option>Friends</option>
            <option>Only me</option>
          </select>
        </div>

        <button
          onClick={handleShare}
          className="w-full mt-6 bg-[#4682B4] text-white py-3 rounded-lg font-bold"
        >
          Share Moment
        </button>
      </div>
    </div>
  );
}
