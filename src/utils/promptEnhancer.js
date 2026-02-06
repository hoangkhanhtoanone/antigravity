/**
 * Enhances a basic prompt into a Nano Banana Pro optimized prompt.
 * Focuses on: Subject, Composition, Action, Setting, Style, and Tech Specs.
 * @param {string} basicPrompt - The user's input prompt.
 * @returns {string} - The enhanced prompt.
 */
export function enhancePrompt(basicPrompt) {
    if (!basicPrompt || basicPrompt.trim().length === 0) return "";

    const styleKeywords = [
        "ultra-realistic", "8k resolution", "cinematic lighting", "highly detailed",
        "photorealistic", "shallow depth of field", "sharp focus", "professional photography"
    ];

    const intros = [
        "A stunning, highly detailed image of",
        "A cinematic shot capturing",
        "A professional photograph of",
        "An ultra-realistic rendering of"
    ];

    // Pick a random intro
    const randomIntro = intros[Math.floor(Math.random() * intros.length)];

    // Construct the enhanced prompt
    // Nano Banana Pro likes natural language + structure.

    const enhanced = `${randomIntro} ${basicPrompt.trim()}. 
The scene is beautifully composed with perfect lighting and balance. 
Details: ${styleKeywords.join(", ")}. 
The image should have a high-end commercial look, with vibrant colors and crisp textures. 
Captured with a high-resolution camera, aiming for specific realism and artistic merit.`;

    return enhanced;
}
