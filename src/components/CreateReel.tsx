import { useState, useRef } from "react";
import {
  ArrowLeft,
  Music,
  Scissors,
  Sparkles,
  Type,
  Image,
  Upload,
  Plus,
  Globe,
  MessageCircle,
  Share2,
  Download,
  ChevronRight,
} from "lucide-react";

type Tool = "sound" | "clips" | "effects" | "text" | "cover" | null;

type Clip = {
  id: number;
  url: string;
  duration: number;
};

type CreateReelProps = {
  onClose: () => void;
  onCreateReel: () => void;
};

export default function CreateReel({ onClose, onCreateReel }: CreateReelProps) {
  const [activeTool, setActiveTool] = useState<Tool>(null);
  const [clips, setClips] = useState<Clip[]>([]);
  const [activeClipId, setActiveClipId] = useState<number | null>(null);
  const [caption, setCaption] = useState("");
  const [audience, setAudience] = useState("Public");
  const [allowComments, setAllowComments] = useState(true);
  const [allowShares, setAllowShares] = useState(true);
  const [saveToDevice, setSaveToDevice] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      const video = document.createElement("video");
      video.src = url;
      video.onloadedmetadata = () => {
        setClips((prev) => [
          ...prev,
          { id: Date.now() + Math.random(), url, duration: video.duration },
        ]);
      };
    });
  }

  function handleRemoveClip(id: number) {
    setClips(clips.filter((clip) => clip.id !== id));
    if (activeClipId === id) setActiveClipId(null);
  }

  const activeClip = clips.find((c) => c.id === activeClipId) || clips[0];

  function handlePost() {
    onCreateReel();
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col h-screen">
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#4682B4]">
        <button onClick={onClose} className="flex items-center gap-2">
          <ArrowLeft size={20} />
          <span className="font-bold text-lg">Create Reel</span>
        </button>
        <button onClick={handlePost} className="bg-[#4682B4] text-white px-5 py-2 rounded-full font-bold">
          Next
        </button>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-56 p-4 border-b md:border-b-0 md:border-r border-[#4682B4]">
          <span className="text-xs font-bold text-slate-400">TOOLS</span>
          <div className="flex flex-col gap-2 mt-3">
            <button
              onClick={() => setActiveTool(activeTool === "sound" ? null : "sound")}
              className={`flex items-center gap-2 p-2 rounded-lg text-left ${activeTool === "sound" ? "bg-blue-50 text-[#4682B4]" : ""}`}
            >
              <Music size={18} />
              Add sound
            </button>
            <button
              onClick={() => setActiveTool(activeTool === "clips" ? null : "clips")}
              className={`flex items-center gap-2 p-2 rounded-lg text-left ${activeTool === "clips" ? "bg-blue-50 text-[#4682B4]" : ""}`}
            >
              <Scissors size={18} />
              Edit clips
            </button>
            <button
              onClick={() => setActiveTool(activeTool === "effects" ? null : "effects")}
              className={`flex items-center gap-2 p-2 rounded-lg text-left ${activeTool === "effects" ? "bg-blue-50 text-[#4682B4]" : ""}`}
            >
              <Sparkles size={18} />
              Effects
            </button>
            <button
              onClick={() => setActiveTool(activeTool === "text" ? null : "text")}
              className={`flex items-center gap-2 p-2 rounded-lg text-left ${activeTool === "text" ? "bg-blue-50 text-[#4682B4]" : ""}`}
            >
              <Type size={18} />
              Text
            </button>
            <button
              onClick={() => setActiveTool(activeTool === "cover" ? null : "cover")}
              className={`flex items-center gap-2 p-2 rounded-lg text-left ${activeTool === "cover" ? "bg-blue-50 text-[#4682B4]" : ""}`}
            >
              <Image size={18} />
              Cover
            </button>
          </div>

          <span className="text-xs font-bold text-slate-400 mt-6 block">MEDIA</span>
          <input
            type="file"
            accept="video/*"
            multiple
            ref={fileInputRef}
            onChange={handleFilesSelected}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full mt-3 border border-dashed border-[#4682B4] rounded-lg py-6 flex flex-col items-center gap-1 text-sm text-[#4682B4]"
          >
            <Upload size={20} />
            Add from device
          </button>

          <div className="grid grid-cols-3 gap-2 mt-3">
            {clips.map((clip) => (
              <div
                key={clip.id}
                onClick={() => setActiveClipId(clip.id)}
                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
              >
                <video src={clip.url} className="w-full h-full object-cover" />
                <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-1 rounded">
                  {clip.duration.toFixed(1)}s
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-start pt-8 bg-slate-50 p-6">
          <div className="w-64 aspect-[9/16] bg-black rounded-2xl overflow-hidden flex items-center justify-center">
            {activeClip ? (
              <video src={activeClip.url} controls className="w-full h-full object-cover" />
            ) : (
              <span className="text-white text-sm">No clip selected</span>
            )}
          </div>

          {clips.length > 0 && (
            <div className="flex gap-2 mt-4 overflow-x-auto max-w-full">
              {clips.map((clip) => (
                <div key={clip.id} className="relative flex-shrink-0">
                  <div
                    onClick={() => setActiveClipId(clip.id)}
                    className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 ${
                      activeClip?.id === clip.id ? "border-[#4682B4]" : "border-transparent"
                    }`}
                  >
                    <video src={clip.url} className="w-full h-full object-cover" />
                  </div>
                  <button
                    onClick={() => handleRemoveClip(clip.id)}
                    className="absolute -top-1 -right-1 bg-white border border-[#4682B4] rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-20 h-20 flex-shrink-0 border border-dashed border-[#4682B4] rounded-lg flex items-center justify-center"
              >
                <Plus size={20} className="text-[#4682B4]" />
              </button>
            </div>
          )}
          <p className="text-xs text-slate-400 mt-2">Click a clip to preview it</p>
        </div>

        <div className="w-full md:w-72 p-4 border-t md:border-t-0 md:border-l border-[#4682B4]">
          <span className="text-xs font-bold text-slate-400">DETAILS</span>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Caption..."
            maxLength={2200}
            rows={4}
            className="w-full mt-2 border border-[#4682B4] rounded-lg p-3 outline-none resize-none text-sm"
          />
          <div className="text-right text-xs text-slate-400">{caption.length}/2200</div>

          <span className="text-xs font-bold text-slate-400 mt-4 block">AUDIENCE</span>
          <p className="text-xs text-slate-400">Who can see this Reel?</p>
          <div className="flex items-center justify-between border border-[#4682B4] rounded-lg p-3 mt-2">
            <div className="flex items-center gap-2 text-sm">
              <Globe size={16} />
              <div>
                <div className="font-bold">{audience}</div>
                <div className="text-xs text-slate-400">Anyone on or off Reed</div>
              </div>
            </div>
            <ChevronRight size={16} />
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2 text-sm">
              <MessageCircle size={16} />
              Allow comments
            </div>
            <div
              onClick={() => setAllowComments(!allowComments)}
              className={`w-9 h-5 rounded-full relative cursor-pointer ${allowComments ? "bg-[#4682B4]" : "bg-slate-200"}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white ${allowComments ? "left-4.5" : "left-0.5"}`} />
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2 text-sm">
              <Share2 size={16} />
              Allow shares
            </div>
            <div
              onClick={() => setAllowShares(!allowShares)}
              className={`w-9 h-5 rounded-full relative cursor-pointer ${allowShares ? "bg-[#4682B4]" : "bg-slate-200"}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white ${allowShares ? "left-4.5" : "left-0.5"}`} />
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2 text-sm">
              <Download size={16} />
              Save to device
            </div>
            <div
              onClick={() => setSaveToDevice(!saveToDevice)}
              className={`w-9 h-5 rounded-full relative cursor-pointer ${saveToDevice ? "bg-[#4682B4]" : "bg-slate-200"}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white ${saveToDevice ? "left-4.5" : "left-0.5"}`} />
            </div>
          </div>

          <button onClick={handlePost} className="w-full mt-6 bg-[#4682B4] text-white py-3 rounded-lg font-bold">
            Post Reel
          </button>
        </div>
      </div>
    </div>
  );
}
