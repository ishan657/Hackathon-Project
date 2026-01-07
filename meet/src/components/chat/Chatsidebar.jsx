
const friends = [
  { id: 1, name: "Aman", lastMsg: "Hey bro!" },
  { id: 2, name: "Riya", lastMsg: "See you tomorrow" },
  { id: 3, name: "Soham", lastMsg: "Let's hack 🚀" },
  { id: 4, name: "Bitik", lastMsg: "Let's code 🚀" },
  { id: 5, name: "Ishan", lastMsg: "Let's create 🚀" },
  { id: 6, name: "Avnish", lastMsg: "Let's enjoy 🚀" },
  { id: 7, name: "Aanand", lastMsg: "Let's pack 🚀" },
  { id: 8, name: "Lord", lastMsg: "Let's crack Gate 🚀" },
  { id: 9, name: "Saral", lastMsg: "Let's crack Accenture 🚀" },
  { id: 10, name: "Aditya", lastMsg: "Let's crack Texas 🚀" },
  { id: 11, name: "Abhirup", lastMsg: "Let's crack VLSI 🚀" },
  { id: 12, name: "Anupam", lastMsg: "Let's crack GATE 🚀" },
];

export default function Chatsidebar({ activeFriend, setActiveFriend }) {
  return (
    <div className="
      w-72
      
      border-r border-zinc-200 dark:border-zinc-800
      bg-white dark:bg-zinc-950
      overflow-y-auto
    ">
      {/* Header */}
      <div className="
        p-4 font-semibold text-lg
        border-b border-zinc-200 dark:border-zinc-800
        text-zinc-900 dark:text-zinc-100
       
      ">
        Friend List
      </div>

      {/* Friends */}
      {friends.map(friend => (
        <div
          key={friend.id}
          onClick={() => setActiveFriend(friend)}
          className={`
            p-4 cursor-pointer transition
            hover:bg-zinc-100 dark:hover:bg-zinc-800
            ${activeFriend?.id === friend.id 
              ? "bg-zinc-200 dark:bg-zinc-800" 
              : ""}
          `}
        >
          <div className="font-medium text-zinc-900 dark:text-zinc-100">
            {friend.name}
          </div>

          <div className="text-sm text-zinc-500 dark:text-zinc-400 truncate">
            {friend.lastMsg}
          </div>
        </div>
      ))}
    </div>
  );
}

  