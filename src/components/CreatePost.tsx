import { useState, useRef } from "react";
import { X, Image, Smile, MapPin, MoreHorizontal, BarChart2, Trash2, FileText } from "lucide-react";

type Option = "photo" | "gif" | "poll" | "location" | "feeling" | "more" | null;

type CreatePostProps = {
  onClose: () => void;
};

type UploadedFile = {
  url: string;
  type: "image" | "video" | "file";
  name: string;
};

const feelings = ["Happy", "Excited", "Grateful", "Motivated", "Loved", "Relaxed"];
const locations = ["Lagos, Nigeria", "Abuja, Nigeria", "Remote", "Office"];
const gifPlaceholders = ["GIF 1", "GIF 2", "GIF 3", "GIF 4"];

export default function CreatePost({ onClose }: CreatePostProps) {
  const [text, setText] = useState("");
  const [activeOption, setActiveOption] = useState<Option>(null);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [selectedGif, setSelectedGif] = useState<string | null>(null);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState<string[]>(["", ""]);
  const [location, setLocation] = useState<string | null>(null);
  const [feeling, setFeeling] = useState<string | null>(null);
  const [audience, setAudience] = useState("Public");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function toggleOption(option: Option) {
    setActiveOption(activeOption === option ? null : option);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    let type: UploadedFile["type"] = "file";
    if (file.type.startsWith("image/")) type = "image";
    else if (file.type.startsWith("video/")) type = "video";

    setUploadedFile({ url, type, name: file.name });
  }

  function handleAddPollOption() {
    if (pollOptions.length < 4) {
      setPollOptions([...pollOptions, ""]);
    }
  }

  function handlePollOptionChange(index: number, value: string) {
    const updated = [...pollOptions];
    updated[index] = value;
    setPollOptions(updated);
  }

  function handlePost() {
    console.log("Posting:", { text, uploadedFile, selectedGif, pollQuestion, pollOptions, location, feeling, audience });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#4682B4]">
        <button onClick={onClose}>
          <X size={22} />
        </button>
        <span className="font-bold text-lg">Create Post</span>
        <button onClick={handlePost} className="bg-[#4682B4] text-white px-5 py-2 rounded-full font-bold">
          Post
        </button>
      </div>

      <div className="flex-1 overflow-y-auto max-w-2xl w-full mx-auto p-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-200" />
          <span className="font-bold">@username</span>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full mt-4 outline-none resize-none text-lg"
          rows={4}
        />

        {uploadedFile && (
          <div className="relative mt-4">
            {uploadedFile.type === "image" && (
              <img src={uploadedFile.url} className="w-full rounded-lg max-h-96 object-cover" />
            )}
            {uploadedFile.type === "video" && (
              <video src={uploadedFile.url} controls className="w-full rounded-lg max-h-96" />
            )}
            {uploadedFile.type === "file" && (
              <div className="flex items-center gap-3 border border-[#4682B4] rounded-lg p-4">
                <FileText size={24} className="text-[#4682B4]" />
                <span className="text-sm">{uploadedFile.name}</span>
              </div>
            )}
            <button
              onClick={() => setUploadedFile(null)}
              className="absolute top-2 right-2 bg-white rounded-full p-1.5 border border-[#4682B4]"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}

        {activeOption === "gif" && (
          <div className="mt-4">
            <div className="grid grid-cols-4 gap-2">
              {gifPlaceholders.map((gif) => (
                <button
                  key={gif}
                  onClick={() => setSelectedGif(gif)}
                  className={`h-20 rounded-lg border ${selectedGif === gif ? "border-[#4682B4] bg-blue-50" : "border-slate-200"}`}
                >
                  {gif}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeOption === "poll" && (
          <div className="mt-4 border border-[#4682B4] rounded-lg p-4">
            <input
              type="text"
              value={pollQuestion}
              onChange={(e) => setPollQuestion(e.target.value)}
              placeholder="Ask a question..."
              className="w-full outline-none font-bold border-b border-slate-200 pb-2"
            />
            {pollOptions.map((option, index) => (
              <input
                key={index}
                type="text"
                value={option}
                onChange={(e) => handlePollOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className="w-full outline-none mt-3 border-b border-slate-200 pb-2"
              />
            ))}
            {pollOptions.length < 4 && (
              <button onClick={handleAddPollOption} className="mt-3 text-[#4682B4] text-sm">
                + Add option
              </button>
            )}
          </div>
        )}

        {activeOption === "location" && (
          <div className="mt-4 flex flex-wrap gap-2">
            {locations.map((loc) => (
              <button
                key={loc}
                onClick={() => setLocation(loc)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm ${
                  location === loc ? "border-[#4682B4] bg-blue-50 text-[#4682B4]" : "border-slate-200"
                }`}
              >
                <MapPin size={14} />
                {loc}
              </button>
            ))}
          </div>
        )}

        {activeOption === "feeling" && (
          <div className="mt-4 flex flex-wrap gap-2">
            {feelings.map((f) => (
              <button
                key={f}
                onClick={() => setFeeling(f)}
                className={`px-3 py-1.5 rounded-full border text-sm ${
                  feeling === f ? "border-[#4682B4] bg-blue-50 text-[#4682B4]" : "border-slate-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        )}

        {(location || feeling) && (
          <div className="mt-3 text-sm text-slate-400">
            {feeling && `Feeling ${feeling}`}
            {feeling && location && " · "}
            {location && `at ${location}`}
          </div>
        )}

        <div className="border-t border-[#4682B4] mt-6 pt-4">
          <span className="text-slate-400 text-sm">Add to your post</span>
          <div className="grid grid-cols-3 gap-3 mt-3">
            <input type="file" accept="image/*,video/*,.pdf,.doc,.docx" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center gap-1.5 border border-[#4682B4] rounded-lg py-3"
            >
              <Image size={20} />
              <span className="text-xs">Photo / Video / File</span>
            </button>
            <button
              onClick={() => toggleOption("gif")}
              className={`flex flex-col items-center gap-1.5 border rounded-lg py-3 ${activeOption === "gif" ? "border-[#4682B4] bg-blue-50" : "border-[#4682B4]"}`}
            >
              <span className="text-xs font-bold">GIF</span>
            </button>
            <button
              onClick={() => toggleOption("poll")}
              className={`flex flex-col items-center gap-1.5 border rounded-lg py-3 ${activeOption === "poll" ? "border-[#4682B4] bg-blue-50" : "border-[#4682B4]"}`}
            >
              <BarChart2 size={20} />
              <span className="text-xs">Poll</span>
            </button>
            <button
              onClick={() => toggleOption("location")}
              className={`flex flex-col items-center gap-1.5 border rounded-lg py-3 ${activeOption === "location" ? "border-[#4682B4] bg-blue-50" : "border-[#4682B4]"}`}
            >
              <MapPin size={20} />
              <span className="text-xs">Location</span>
            </button>
            <button
              onClick={() => toggleOption("feeling")}
              className={`flex flex-col items-center gap-1.5 border rounded-lg py-3 ${activeOption === "feeling" ? "border-[#4682B4] bg-blue-50" : "border-[#4682B4]"}`}
            >
              <Smile size={20} />
              <span className="text-xs">Feeling / Activity</span>
            </button>
            <button
              onClick={() => toggleOption("more")}
              className={`flex flex-col items-center gap-1.5 border rounded-lg py-3 ${activeOption === "more" ? "border-[#4682B4] bg-blue-50" : "border-[#4682B4]"}`}
            >
              <MoreHorizontal size={20} />
              <span className="text-xs">More</span>
            </button>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-[#4682B4] pt-4">
          <span className="text-slate-400 text-sm">Who can see this?</span>
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
      </div>
    </div>
  );
}
