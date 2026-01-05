


export default function Chatwindow({ activeFriend }) {
  if (!activeFriend) {
    return (
      <div className="
        flex-1 flex items-center justify-center
        text-zinc-500 dark:text-zinc-400
        bg-zinc-50 dark:bg-zinc-950
      ">
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-zinc-950">
      {/* Header */}
      <div className="
        p-4 border-b border-zinc-200 dark:border-zinc-800
        font-semibold
        text-zinc-900 dark:text-zinc-100
        bg-white dark:bg-zinc-900
      ">
        {activeFriend.name}
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-zinc-50 dark:bg-zinc-950">
        {/* Incoming */}
        <div className="mb-2">
          <span className="
            bg-zinc-200 dark:bg-zinc-800
            text-zinc-900 dark:text-zinc-100
            px-3 py-2 rounded-lg inline-block
          ">
            Hi 👋
          </span>
        </div>

        {/* Outgoing */}
        <div className="mb-2 text-right">
          <span className="
            bg-blue-500 dark:bg-blue-600
            text-white
            px-3 py-2 rounded-lg inline-block
          ">
            Hello 😄
          </span>
        </div>
      </div>

      {/* Input */}
      <div className="
        p-4 border-t border-zinc-200 dark:border-zinc-800
        bg-white dark:bg-zinc-900
      ">
        <input
          className="
            w-full rounded-full px-4 py-2
            border border-zinc-300 dark:border-zinc-700
            bg-white dark:bg-zinc-800
            text-zinc-900 dark:text-zinc-100
            placeholder:text-zinc-400 dark:placeholder:text-zinc-500
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
          placeholder="Type a message..."
        />
      </div>
    </div>
  );
}

  