import ReactMarkdown from "react-markdown";
import SourceChips from "./source-chips";
import type { ChatMessage } from "../types";

export default function MessageBubble({ message }: { message: ChatMessage }) {
  if (message.role === "user") {
    return (
      <div className="flex flex-col items-end">
        <div className="max-w-[80%] rounded-[4px] bg-subtle px-3.5 py-2.5 text-sm text-ink">
          {message.text}
        </div>
        <span className="mt-1 text-[11px] text-slate">{message.time}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start">
      <div className="max-w-[80%] rounded-[4px] rounded-l-none border border-l-[3px] border-line border-l-secondary bg-subtle px-3.5 py-2.5 text-sm text-ink">
        <div className="flex flex-col gap-2 [&_code]:rounded-[2px] [&_code]:bg-line [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[13px] [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:font-medium [&_ul]:list-disc [&_ul]:pl-5">
          <ReactMarkdown>{message.text}</ReactMarkdown>
        </div>
        {message.sources && <SourceChips sources={message.sources} />}
      </div>
      <span className="mt-1 text-[11px] text-slate">{message.time}</span>
    </div>
  );
}
