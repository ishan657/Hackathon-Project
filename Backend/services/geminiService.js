const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const rankMatches = async (targetUser, candidates) => {
  try {
    // Force JSON Mode for the model response
    const model = genAI.getGenerativeModel(
      { 
        model: "gemini-1.5-flash", // Note: Ensure your model name is correct for your tier
        generationConfig: { responseMimeType: "application/json" } 
      }
    );

    // FIX 1: Convert MongoDB ObjectIds to Strings explicitly using .toString()
    const profiles = candidates.map(u => 
      `ID: ${u._id.toString()}, Name: ${u.name}, Age: ${u.age}, Year: ${u.academicYear}, Gender: ${u.gender}, Bio: ${u.bio}, Goal: ${u.lookingFor}, Interests: ${u.interests?.join(", ") || "None listed"}`
    ).join("\n---\n");

    const systemRules = `You are a campus matchmaker. 
      PRIORITY 1: Respect gender constraints (e.g., 'Girl Gang' = only females).
      PRIORITY 2: Favor students in the same Academic Year (${targetUser.academicYear}).
      PRIORITY 3: Match deeply based on 'Interests' and 'Bio'.`;

    const prompt = `
      ${systemRules}

      TARGET USER:
      Name: ${targetUser.name}, Gender: ${targetUser.gender}, Year: ${targetUser.academicYear}, 
      Bio: ${targetUser.bio}, Interests: ${targetUser.interests?.join(", ")}, Looking For: ${targetUser.lookingFor}

      CANDIDATES:
      ${profiles}

      TASK:
      1. Return exactly the TOP 3 strongest connections.
      2. Scoring: 1-10.
      3. Reasoning: One high-impact sentence.
      
      CRITICAL: Return ONLY a valid JSON array. Do NOT use "new ObjectId()" or any JavaScript constructors. 
      The "id" field MUST be a plain string.
      
      SCHEMA: [{"id": "string", "name": "string", "score": number, "reason": "string"}]
    `;

    const result = await model.generateContent(prompt);
    let text = result.response.text();
    
    // FIX 2: Even with JSON mode, defensive cleaning is good
    const cleanJson = text.replace(/```json|```/g, "").trim();
    
    // FIX 3: Safety check for common AI hallucinations
    const fixedJson = cleanJson.replace(/new ObjectId\(['"](.+?)['"]\)/g, '"$1"');

    return JSON.parse(fixedJson);

  } catch (error) {
    console.error("❌ Gemini Error:", error.message);
    // Ensure we return strings for IDs in fallback too
    return candidates.slice(0, 3).map(u => ({
      id: u._id.toString(), 
      name: u.name, 
      score: 5, 
      reason: "Fallback match based on campus proximity."
    }));
  }
};

module.exports = { rankMatches };
