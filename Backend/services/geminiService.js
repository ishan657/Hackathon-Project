const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const rankMatches = async (targetUser, candidates) => {
  try {
    // FIX: Using the current active model 'gemini-2.5-flash'
    // 1.5-flash is discontinued on this endpoint as of late 2025/early 2026.
    const model = genAI.getGenerativeModel(
      {model: "gemini-2.5-flash" },
      { apiVersion : "v1"}
    );

    // RESTORED: Your exact mapping logic
    const profiles = candidates.map(u => 
      `ID: ${u._id}, Name: ${u.name}, Age: ${u.age}, Year: ${u.academicYear}, Gender: ${u.gender}, Bio: ${u.bio}, Goal: ${u.lookingFor}, Interests: ${u.interests?.join(", ") || "None listed"}`
    ).join("\n---\n");

    const systemRules = `You are a campus matchmaker. 
      PRIORITY 1: Respect gender constraints (e.g., 'Girl Gang' = only females).
      PRIORITY 2: Favor students in the same Academic Year (${targetUser.academicYear}) for academic/social synergy.
      PRIORITY 3: Match deeply based on the 'Interests' array and 'Bio'.
      Provide the Top 3 best matches.`;

   const prompt = `
      ${systemRules}

      TARGET USER:
      Name: ${targetUser.name}, Gender: ${targetUser.gender}, Year: ${targetUser.academicYear}, 
      Bio: ${targetUser.bio}, Interests: ${targetUser.interests?.join(", ")}, Looking For: ${targetUser.lookingFor}

      CANDIDATES:
      ${profiles}

      TASK:
      1. GENDER FILTER: Strictly exclude candidates that do not align with the Target User's 'Looking For' or 'Bio' gender preferences.
      
      2. DEEP SEMANTIC MATCHING (PRIORITY): 
         - Compare the 'Bio' and 'Interests' of the Target User against each candidate.
         - Look for "Personality Synergy": If the bio suggests an introvert, match with complementary personalities.
         - Look for "Interest Clusters": Instead of exact matches, group related things (e.g., 'Coding' matches 'Tech', 'Hiking' matches 'Fitness').
      
      3. ACADEMIC TIE-BREAKER: Between two similar matches, rank the one in the SAME academic year (${targetUser.academicYear}) higher.
      
      4. SELECTION: Pick exactly the TOP 3 strongest connections.

      5. SCORING: Assign a 1-10 compatibility score based on the depth of the shared bio/interest "vibe."

      6. REASONING: Write a SINGLE, high-impact sentence for each 'reason' explaining the specific "vibe" or shared passion that connects them.

      OUTPUT: Return ONLY a raw JSON array. No extra text.
      SCHEMA: [{"id": "string", "name": "string", "score": number, "reason": "string"}]
    `;

    const result = await model.generateContent(prompt);

    let text = result.response.text();
    // Clean potential markdown formatting
    const cleanJson = text.replace(/```json|```/g, "").trim();
    
    return JSON.parse(cleanJson);

  } catch (error) {
    console.error("❌ Gemini Error:", error.message);
    // RESTORED: Your exact fallback
    return candidates.slice(0, 3).map(u => ({
      id: u._id, name: u.name, score: 5, reason: "Fallback match based on campus proximity."
    }));
  }
};

module.exports = { rankMatches };