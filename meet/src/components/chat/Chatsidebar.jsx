const friends = [
    { id: 1, name: "Aman", lastMsg: "Hey bro!" },
    { id: 2, name: "Riya", lastMsg: "See you tomorrow" },
    { id: 3, name: "Soham", lastMsg: "Let's hack 🚀" },
    { id: 4, name: "Bitik", lastMsg: "Let's code 🚀" },
    { id: 5, name: "Ishan", lastMsg: "Let's create 🚀" },
    { id: 6, name: "Avnish", lastMsg: "Let's enjoy 🚀" },
    { id: 7, name: "Aanand", lastMsg: "Let's pack 🚀" },
    { id: 8, name: "Lord", lastMsg: "Let's crack GAte🚀" },
    { id: 9, name: "Saral", lastMsg: "Let's crack Accenture 🚀" },
    { id: 10, name: "Aditya", lastMsg: "Let's crack TExas 🚀" },
    { id: 11, name: "Abhirup", lastMsg: "Let's crack VLSi 🚀" },
    { id: 12, name: "Anupam", lastMsg: "Let's crack gate 🚀" },
  ];
  
  export default function Chatsidebar({ activeFriend, setActiveFriend }) {
    return (
      <div className="w-72 border-r bg-white overflow-y-auto">
        <div className="p-4 font-semibold text-lg border-b">
          Friend_list
        </div>
  
        {friends.map(friend => (
          <div
            key={friend.id}
            onClick={() => setActiveFriend(friend)}
            className={`p-4 cursor-pointer hover:bg-gray-100 transition
              ${activeFriend?.id === friend.id ? "bg-gray-200" : ""}`}
          >
            <div className="font-medium">{friend.name}</div>
            <div className="text-sm text-gray-500 truncate">
              {friend.lastMsg}
            </div>
          </div>
        ))}
      </div>
    );
  }
  