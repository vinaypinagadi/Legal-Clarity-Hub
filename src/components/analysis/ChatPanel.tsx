import { Loader2, Send } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import type { ChatMessage } from "@/types/legal";

interface ChatPanelProps {
  messages: ChatMessage[];
  pending: boolean;
  onSend: (question: string) => void;
}

export function ChatPanel({ messages, pending, onSend }: ChatPanelProps) {
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputId = useId();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
    if (!pending) inputRef.current?.focus();
  }, [messages, pending]);

  return (
    <div className="flex flex-col">
      <div
        className="max-h-[460px] flex-1 space-y-3 overflow-y-auto pr-1"
        role="log"
        aria-label="Assistant conversation"
        aria-live="polite"
        tabIndex={0}
      >
        {messages.map((message) =>
          message.role === "assistant" ? (
            <div key={message.id} className="max-w-[92%]">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-ink/50 uppercase">
                Assistant
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-ink/85">{message.content}</p>
            </div>
          ) : (
            <div
              key={message.id}
              className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-navy px-3.5 py-2.5 text-[13px] leading-relaxed text-white"
            >
              {message.content}
            </div>
          ),
        )}
        {pending ? (
          <p className="flex items-center gap-2 text-[12.5px] font-medium text-ink/60">
            <Loader2 className="size-3.5 animate-spin" aria-hidden="true" /> Thinking…
          </p>
        ) : null}
        <div ref={endRef} />
      </div>

      <form
        className="mt-3 flex items-center gap-2 border-t border-black/5 pt-3"
        onSubmit={(event) => {
          event.preventDefault();
          if (!draft.trim() || pending) return;
          onSend(draft);
          setDraft("");
        }}
      >
        <label htmlFor={inputId} className="sr-only">
          Ask a question about this document
        </label>
        <input
          id={inputId}
          ref={inputRef}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ask about a clause…"
          className="h-10 min-w-0 flex-1 rounded-xl border border-ink/12 bg-white/75 px-3 text-[13px] text-ink placeholder:text-ink/45 focus:border-brand focus:outline-none"
        />
        <button
          type="submit"
          disabled={pending || !draft.trim()}
          aria-label="Send question"
          className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand text-white shadow-lg shadow-brand/25 transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send className="size-4" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
