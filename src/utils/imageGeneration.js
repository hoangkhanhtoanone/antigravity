export async function generateImageGoogle(prompt, apiKey) {
    if (!apiKey) throw new Error("API Key is missing");

    // Endpoint for Imagen 3 via Gemini API
    const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${apiKey}`;

    const payload = {
        instances: [
            {
                prompt: prompt
            }
        ],
        parameters: {
            sampleCount: 1,
            aspectRatio: "1:1" // Optional, can enable later
        }
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || `API Error: ${response.status}`);
        }

        const data = await response.json();

        // Check structure of response. Usually predictions[0].bytesBase64Encoded or similar
        if (data.predictions && data.predictions.length > 0) {
            const base64Image = data.predictions[0].bytesBase64Encoded;
            return `data:image/png;base64,${base64Image}`;
        } else {
            throw new Error("No image data received from API");
        }

    } catch (error) {
        console.error("Generation failed:", error);
        throw error;
    }
}
