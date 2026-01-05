const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const rankMatches = async (targetUser, candidates) => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: `You are a campus matchmaker. 
      PRIORITY 1: Respect gender constraints (e.g., 'Girl Gang' = only females).
      PRIORITY 2: Favor students in the same Academic Year for academic/social synergy.
      PRIORITY 3: Match based on interests and hobbies.
      Provide the Top 3 best matches.`
    });

    const profiles = candidates.map(u => 
      `ID: ${u._id}, Name: ${u.name}, Age: ${u.age}, Year: ${u.academicYear}, Gender: ${u.gender}, Bio: ${u.bio}, Goal: ${u.lookingFor}, Interests: ${u.interests.join(", ")}`
    ).join("\n---\n");

    const prompt = `
      TARGET USER:
      Name: ${targetUser.name}, Gender: ${targetUser.gender}, Year: ${targetUser.academicYear}, Bio: ${targetUser.bio}, Looking For: ${targetUser.lookingFor}

      CANDIDATES:
      ${profiles}

      TASK:
      1. Filter candidates by gender preference if specified in 'Looking For' or 'Bio'.
      2. Rank the candidates, placing those in the SAME academic year as the target higher.
      3. Select the TOP 3 candidates.
      4. Score each from 1-10 and write a 2-sentence reasoning.

      OUTPUT: Return a JSON array of exactly 3 objects.
      SCHEMA: [{"id": "string", "name": "string", "score": number, "reason": "string"}]
    `;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.1 // Low temperature ensures strict adherence to ranking rules
      }
    });

    return JSON.parse(result.response.text());

  } catch (error) {
    console.error("❌ Gemini Error:", error.message);
    // Return empty array or top 3 raw database results as fallback
    return candidates.slice(0, 3).map(u => ({
      id: u._id, name: u.name, score: 5, reason: "Fallback match based on availability."
    }));
  }
};

module.exports = { rankMatches };