import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.deepseek.com/v1",
});

export async function POST(req: NextRequest) {
  try {
    const { spirit, flavorProfile, occasion, barTools, guestCount, cocktailStyle, nonAlcoholic } = await req.json();

    const response = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: `You are an expert mixologist and cocktail historian. Generate complete cocktail recipes including: ingredient list with precise measurements (oz/ml), step-by-step mixing instructions, glassware recommendation, garnish suggestions, flavor profile description, bartender tips, and variations. Format with markdown headers and elegant presentation.`,
        },
        {
          role: "user",
          content: `Generate a cocktail recipe:
- Base Spirit: ${spirit}
- Flavor Profile: ${flavorProfile}
- Occasion: ${occasion}
- Bar Tools Available: ${barTools}
- Guest Count: ${guestCount}
- Cocktail Style: ${cocktailStyle}
- Alcohol Level: ${nonAlcoholic}`,
        },
      ],
      temperature: 0.8,
      max_tokens: 2000,
    });

    return NextResponse.json({ result: response.choices[0].message.content });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
