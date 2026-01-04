export default function Chatwindow({ activeFriend }) {
    if (!activeFriend) {
      return (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select a chat to start messaging
        </div>
      );
    }
  
    return (
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b font-semibold">
          {activeFriend.name}
        </div>
  
        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="mb-2">
            <span className="bg-gray-200 px-3 py-2 rounded-lg inline-block">
              Hi 👋
            </span>
          </div>
          <div className="mb-2 text-right">
            <span className="bg-blue-500 text-white px-3 py-2 rounded-lg inline-block">
              Hello 😄
            </span>
          </div>
        </div>
  
        {/* Input */}
        <div className="p-4 border-t">
          <input
            className="w-full border rounded-full px-4 py-2"
            placeholder="Type a message..."
          />
        </div>
      </div>
    );
  }
  