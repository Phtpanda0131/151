import { GoogleGenAI } from "@google/genai";
import { Card, PriceData } from "../types";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getCardPrice = async (card: Card): Promise<PriceData> => {
  try {
    const prompt = `
      What is the current market price for the Pokémon card "${card.name}" 
      (Card number ${card.number} from the Scarlet & Violet 151 set)?
      Provide a specific price range in USD for the card in Near Mint condition.
      Keep the answer concise and focused on the price.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        maxOutputTokens: 200,
        temperature: 0.5,
      }
    });

    // Extract grounding sources if available
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.map((chunk: any) => chunk.web)
      .filter((web: any) => web)
      .map((web: any) => ({
        title: web.title,
        uri: web.uri
      })) || [];

    return {
      text: response.text || "Price information unavailable.",
      sources: sources
    };
  } catch (error) {
    console.error("Error fetching card price:", error);
    return {
      text: "Could not retrieve price at this time.",
      sources: []
    };
  }
};