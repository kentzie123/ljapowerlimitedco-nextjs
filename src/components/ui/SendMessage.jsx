// Lucide icons
import { Send, Paperclip, X, FileText, File, Smile } from "lucide-react";

// Hooks
import { useRef, useState, useEffect } from "react";

// Stores
import { useChatStore } from "@/stores/useChatStore"; // Adjusted import path
import { toast } from "react-toastify";

// File Helpers
import { formatFileSize } from "@/utils/fileHelpers"; // Adjusted import path

// Emoji Picker
import EmojiPicker from "emoji-picker-react";

const SendMessage = () => {
  const { sendMessage, isSendingMessage } = useChatStore();
  const selectFileRef = useRef();
  const textareaRef = useRef();
  const emojiPickerRef = useRef();

  const [message, setMessage] = useState({ text: "" });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(textareaRef.current.scrollHeight, 120);
      textareaRef.current.style.height = `${newHeight}px`;
      textareaRef.current.style.overflowY =
        textareaRef.current.scrollHeight > 120 ? "auto" : "hidden";
    }
  }, [message.text]);

  // File Icon Helper
  const getFileIcon = (file) => {
    const type = file.type;
    if (type.includes("word") || type.includes("document"))
      return <FileText className="size-4" />;
    if (type.includes("excel") || type.includes("spreadsheet"))
      return <FileText className="size-4" />;
    if (type.includes("powerpoint") || type.includes("presentation"))
      return <FileText className="size-4" />;
    if (type === "application/pdf") return <FileText className="size-4" />;
    return <File className="size-4" />;
  };

  const allowedTypes = {
    images: [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ],
    documents: [
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/pdf",
      "text/plain",
    ],
  };

  const allAllowedTypes = [...allowedTypes.images, ...allowedTypes.documents];

  const handleSelectFiles = (files) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter((file) => {
      if (!allAllowedTypes.includes(file.type)) {
        toast.error(`Type not supported: ${file.name}`);
        return false;
      }
      if (file.size / (1024 * 1024) > 10) {
        toast.error(`File too large (>10MB): ${file.name}`);
        return false;
      }
      return true;
    });

    const filesWithPreviews = validFiles.map((file) => ({
      file,
      preview: allowedTypes.images.includes(file.type)
        ? URL.createObjectURL(file)
        : null,
      isImage: allowedTypes.images.includes(file.type),
      uploadProgress: 0,
    }));

    if (filesWithPreviews.length > 0) {
      setSelectedFiles((prev) => [...prev, ...filesWithPreviews]);
    }
    if (selectFileRef.current) selectFileRef.current.value = "";
  };

  const handleRemoveFile = (index) => {
    if (selectedFiles[index].preview)
      URL.revokeObjectURL(selectedFiles[index].preview);
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (
      (!message.text.trim() && selectedFiles.length === 0) ||
      uploading ||
      isSendingMessage
    )
      return;

    setUploading(true);
    setShowEmojiPicker(false);

    try {
      // Process all files in parallel
      const fileAttachments = await Promise.all(
        selectedFiles.map(async (item) => {
          const base64 = await fileToBase64(item.file);
          return {
            name: item.file.name,
            type: item.file.type,
            size: item.file.size,
            data: base64,
            isImage: item.isImage,
          };
        })
      );

      // Simulate 100% progress for UI
      setSelectedFiles((prev) =>
        prev.map((f) => ({ ...f, uploadProgress: 100 }))
      );

      const messageToSend = {
        text: message.text,
        attachments: fileAttachments,
      };

      await sendMessage(messageToSend);

      // Cleanup
      selectedFiles.forEach(
        (file) => file.preview && URL.revokeObjectURL(file.preview)
      );
      setMessage({ text: "" });
      setSelectedFiles([]);
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    } finally {
      setUploading(false);
    }
  };

  const handleEmojiSelect = (emojiData) => {
    setMessage((prev) => ({ ...prev, text: prev.text + emojiData.emoji }));
  };

  const isSendDisabled =
    (!message.text.trim() && selectedFiles.length === 0) ||
    uploading ||
    isSendingMessage;

  return (
    <div className="p-3 bg-(--panel-blue) border-t border-(--card-blue)">
      {/* Selected Files Preview */}
      {selectedFiles.length > 0 && (
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-(--accent-yellow)">
              Selected Files ({selectedFiles.length})
            </span>
            <button
              onClick={() => {
                selectedFiles.forEach(
                  (f) => f.preview && URL.revokeObjectURL(f.preview)
                );
                setSelectedFiles([]);
              }}
              className="text-xs text-gray-400 hover:text-white transition-colors"
            >
              Clear All
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[var(--card-blue)] scrollbar-track-transparent">
            {selectedFiles.map((item, index) => (
              <div
                key={index}
                className="relative flex flex-col bg-(--card-blue) rounded-lg border border-(--panel-blue) p-2 w-28 shrink-0 group"
              >
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="absolute -top-2 -right-2 z-10 bg-(--accent-yellow) text-black rounded-full p-1 shadow-md hover:scale-110 transition-transform"
                >
                  <X className="size-3" />
                </button>

                <div className="h-20 mb-2 w-full flex items-center justify-center bg-black/20 rounded overflow-hidden">
                  {item.isImage ? (
                    <img
                      src={item.preview}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-(--accent-yellow)">
                      {getFileIcon(item.file)}
                    </div>
                  )}
                </div>
                <div className="text-xs text-white truncate">
                  {item.file.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="relative">
        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div
            ref={emojiPickerRef}
            className="absolute bottom-full right-0 mb-2 z-20 shadow-xl rounded-xl overflow-hidden"
          >
            <EmojiPicker
              onEmojiClick={handleEmojiSelect}
              theme="dark"
              height={300}
              width={280}
              searchDisabled={false}
              skinTonesDisabled={true}
              previewConfig={{ showPreview: false }}
            />
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="flex items-end gap-2">
          <div className="relative grow">
            <textarea
              ref={textareaRef}
              value={message.text}
              placeholder="Type a message..."
              disabled={uploading}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              onChange={(e) => setMessage({ ...message, text: e.target.value })}
              rows={1}
              className="w-full px-4 py-3 rounded-xl bg-(--card-blue) border border-(--panel-blue)-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-(--accent-yellow) resize-none min-h-11 max-h-[120px] scrollbar-none"
            />
          </div>

          <input
            ref={selectFileRef}
            onChange={(e) => handleSelectFiles(e.target.files)}
            type="file"
            multiple
            hidden
            accept={allAllowedTypes.join(",")}
          />

          <div className="flex gap-1 pb-1">
            {/* Desktop: Emoji Button */}
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="hidden md:flex p-2.5 rounded-full hover:bg-(--card-blue) text-gray-400 hover:text-(--accent-yellow) transition-colors"
            >
              <Smile className="size-5" />
            </button>

            {/* File Button */}
            <button
              type="button"
              onClick={() => selectFileRef.current?.click()}
              className="p-2.5 rounded-full hover:bg-(--card-blue) text-gray-400 hover:text-(--accent-yellow) transition-colors"
            >
              <Paperclip className="size-5" />
            </button>

            {/* Send Button */}
            <button
              type="submit"
              disabled={isSendDisabled}
              className="p-2.5 rounded-full bg-(--accent-yellow) text-black hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
            >
              {uploading || isSendingMessage ? (
                <div className="size-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="size-5 ml-0.5" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendMessage;
