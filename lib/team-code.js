// Readable alphanumeric team code. Avoids 0/O and 1/I.
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateTeamCode(len = 6) {
  let out = "";
  for (let i = 0; i < len; i++) {
    out += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return out;
}

// Try a few times to find a code that doesn't collide in the DB.
export async function generateUniqueTeamCode(TeamModel, maxAttempts = 8) {
  for (let i = 0; i < maxAttempts; i++) {
    const code = generateTeamCode(6);
    const existing = await TeamModel.findOne({ teamCode: code }).lean();
    if (!existing) return code;
  }
  // Fallback — add timestamp bits
  return generateTeamCode(6) + Date.now().toString(36).slice(-2).toUpperCase();
}
