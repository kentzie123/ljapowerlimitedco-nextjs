// Time formatter
import { formatChatTimestamp } from "@/utils/timeFormat";

// Icons
import { FileText, File, Download } from "lucide-react";

// File Helpers
import { formatFileSize } from "@/utils/fileHelpers";

const ChatBubble = ({ message, isMine }) => {
  const openImagePreview = (imageUrl) => {
    if (imageUrl) window.open(imageUrl, "_blank");
  };

  const getFileIcon = (file) => {
    const type = file.type?.toLowerCase() || "";
    if (type.includes("word")) {
      return <FileText className="size-4" />;
    } else if (type.includes("excel") || type.includes("spreadsheet")) {
      return <FileText className="size-4" />;
    } else if (type.includes("powerpoint") || type.includes("presentation")) {
      return <FileText className="size-4" />;
    } else if (type.includes("pdf")) {
      return <FileText className="size-4" />;
    } else {
      return <File className="size-4" />;
    }
  };

  return (
    <div className={`chat ${isMine ? "chat-end" : "chat-start"} `}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User Avatar"
            src={isMine ? "/images/default.png" : "/images/lja-logo.webp"}
          />
        </div>
      </div>
      <div className="ps-2 pb-1 chat-header">
        <time className="text-xs opacity-50 text-black">
          {message.created_at && formatChatTimestamp(message.created_at)}
        </time>
      </div>

      {/* Chat Bubble with Attachments Logic */}
      <div
        className={`chat-bubble  ${
          isMine ? "bg-(--panel-blue)" : "bg-[#e9e9e9]"
        } ${
          message.attachments && message.attachments.length > 0
            ? "bg-transparent p-0"
            : ""
        }`}
      >
        {/* Display Attachments */}
        {message.attachments &&
          message.attachments.map((file, index) => (
            <div key={index} className="mb-3 last:mb-0">
              {file.isImage ? (
                // Image Preview
                <div className="rounded-lg overflow-hidden border border-gray-300 max-w-xs">
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => openImagePreview(file.url)}
                  />
                  <div className="p-2 bg-white dark:bg-gray-800">
                    <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
                      {file.name}
                    </p>
                  </div>
                </div>
              ) : (
                // Document File
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-300 p-3 max-w-xs">
                  <div className="flex items-center gap-3">
                    <div className="text-blue-600 flex-shrink-0">
                      {getFileIcon(file)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-600 transition-colors flex-shrink-0"
                      title="Download file"
                    >
                      <Download className="size-4" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}

        {/* Message Text */}
        {message.text && (
          <div
            className={`${
              message.attachments && message.attachments.length > 0
                ? "mt-2 p-3 bg-base-300 rounded-lg"
                : ""
            }`}
          >
            <p
              className={`wrap-break-word whitespace-pre-wrap ${
                !isMine ? "text-black" : "text-white"
              }`}
            >
              {message.text}
            </p>
          </div>
        )}
      </div>

      <div className="text-black text-xs opacity-70">
        {message.isSending ? "Sending..." : ""}
      </div>
    </div>
  );
};

export default ChatBubble;
