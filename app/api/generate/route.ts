import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { baseSpirit, flavorProfile, occasion, glassware, guestCount, nonAlcoholic } = await req.json();

    if (!baseSpirit || !flavorProfile) {
      return NextResponse.json({ error: "Base spirit and flavor profile are required" }, { status: 400 });
    }

    const { OpenAI } = await import("openai");
    const client = new OpenAI({
      baseURL: "https://api.deepseek.com/v1",
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `You are an expert mixologist and cocktail designer. Create a craft cocktail recipe based on:

**Base Spirit:** ${baseSpirit}
**Flavor Profile:** ${flavorProfile}
**Occasion:** ${occasion || "Any occasion"}
**Glassware:** ${glassware || "Classic cocktail glass"}
**Guest Count:** ${guestCount || "1"}
**Non-Alcoholic:** ${nonAlcoholic === "true" ? "Yes - create a sophisticated mocktail" : "No - standard cocktail"}

Please provide:
1. A creative, evocative cocktail name
2. Flavor profile description (aroma, taste, finish)
3. Complete ingredient list with precise measurements
4. Step-by-step mixing instructions
5. Glassware recommendation and garnish
6. Bartender tips for best results
7. Variations or substitutes
${nonAlcoholic === "true" ? "8. Any alcohol-free alternatives for the base spirit" : "8. Food pairing suggestions"}

Format with clear markdown headings. Be specific with measurements (oz, dashes, ml).`;

    const completion = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: "You are an expert mixologist with deep knowledge of spirits, liqueurs, bitters, syrups, and craft cocktail techniques. You create memorable, creative drinks that are balanced and delicious." },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 2000,
    });

    const result = completion.choices[0]?.message?.content || "No cocktail generated.";
    return NextResponse.json({ result });
  } catch (error: unknown) {
    console.error("Generate error:", error);
    const message = error instanceof Error ? error.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
