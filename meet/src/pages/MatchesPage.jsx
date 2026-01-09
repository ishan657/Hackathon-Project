import React, { useState } from "react";
import { ArrowLeft, Check, Loader2, UserPlus } from "lucide-react";
import axios from "axios";

const MatchesPage = ({ aiMatches = [], setPage, user }) => {
  const [connectingId, setConnectingId] = useState(null);
  const [sentRequests, setSentRequests] = useState([]);

  const handleConnect = async (targetId) => {
    if (!targetId) return;

    // Sanitize ID: Ensure it's a valid 24-char hex string (MongoDB format)
    // If Gemini sends "match_1", this will prevent a 500 error on the server
    const cleanId = targetId
      .toString()
      .replace(/[^a-fA-F0-9]/g, "")
      .substring(0, 24);

    if (cleanId.length !== 24) {
      alert("Invalid User ID. This match might be an AI hallucination.");
      return;
    }

    setConnectingId(targetId);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `https://hackathon-project-owg6.onrender.com/api/users/request/${cleanId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data) {
        setSentRequests((prev) => [...prev, targetId]);
      }
    } catch (error) {
      // Improved error logging to see exactly why the connection fails
      const msg =
        error.response?.data?.msg ||
        error.response?.data?.error ||
        "Connection failed";
      alert(msg);
      console.error("Connect error details:", error.response?.data);
    } finally {
      setConnectingId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pt-24 pb-12 px-6">
      {/* HEADER */}
      <div className="flex justify-between items-end mb-10">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Your <span className="text-blue-500 italic font-serif">Gemini</span>{" "}
            Tribe
          </h2>
          <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]">
            Top 3 AI Recommendations
          </p>
        </div>

        <button
          onClick={() => setPage("dashboard")}
          className="flex items-center gap-2 group transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
            Back to Dashboard
          </span>
        </button>
      </div>

      {/* 3-BLOCK GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {aiMatches.length === 0 ? (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl">
            <p className="text-zinc-500 text-sm italic">
              No matches found in the database yet.
            </p>
          </div>
        ) : (
          aiMatches.map((match, index) => {
            // Using match._id or match.id depending on what your backend returns
            const mId = match._id || match.id;
            const isSent = sentRequests.includes(mId);
            const isConnecting = connectingId === mId;

            return (
              <div
                key={mId || index}
                className="group bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col items-center text-center hover:border-zinc-400 dark:hover:border-zinc-500 transition-all duration-200"
              >
                <div className="relative mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-zinc-100 dark:border-zinc-800 bg-zinc-50">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${match.name || "default"}`}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {match.score && (
                    <div className="absolute -top-1 -right-1 bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold">
                      {match.score}
                    </div>
                  )}
                </div>

                <h3 className="text-md font-bold text-zinc-900 dark:text-zinc-100 mb-1 uppercase tracking-tight">
                  {match.name || "Unknown User"}
                </h3>
                <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest mb-4">
                  Ranked #{index + 1}
                </p>

                <div className="flex-grow mb-6">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed italic">
                    "
                    {match.reason || "Matched based on your profile interests."}
                    "
                  </p>
                </div>

                <div className="w-full">
                  <button
                    onClick={() => handleConnect(mId)}
                    disabled={isSent || isConnecting}
                    className={`w-full py-3 text-[11px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2
                      ${
                        isSent
                          ? "bg-emerald-600 text-white cursor-default"
                          : "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90 active:scale-95"
                      }
                      ${isConnecting ? "opacity-70 cursor-wait" : ""}
                    `}
                  >
                    {isConnecting ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : isSent ? (
                      <>
                        <Check className="w-3 h-3" /> Sent
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3 h-3" /> Connect
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MatchesPage;
