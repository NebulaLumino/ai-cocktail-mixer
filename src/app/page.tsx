"use client";

import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    spirit: "",
    flavorProfile: "",
    occasion: "",
    barTools: "",
    guestCount: "",
    cocktailStyle: "",
    nonAlcoholic: "",
  });
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOutput("");
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setOutput(data.result || "Error generating cocktail recipe.");
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-white px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30">
            <span className="text-orange-400 text-sm font-medium">🍸 AI × Food & Cooking</span>
          </div>
          <h1 className="text-4xl font-bold text-orange-400 mb-3">AI Cocktail Mixer</h1>
          <p className="text-gray-400 text-lg">Generate professional cocktail recipes and mixology tips with AI</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Base Spirit Preference</label>
              <select name="spirit" value={form.spirit} onChange={handleChange} required className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all">
                <option value="">Select spirit</option>
                <option value="Vodka">Vodka</option>
                <option value="Gin">Gin</option>
                <option value="Rum">Rum (Light or Dark)</option>
                <option value="Tequila">Tequila (Blanco or Reposado)</option>
                <option value="Whiskey/Bourbon">Whiskey / Bourbon</option>
                <option value="Brandy/Cognac">Brandy / Cognac</option>
                <option value="Mezcal">Mezcal</option>
                <option value="Absinthe">Absinthe</option>
                <option value="Sake">Sake</option>
                <option value="No Preference">No Preference</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Flavor Profile</label>
              <select name="flavorProfile" value={form.flavorProfile} onChange={handleChange} required className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all">
                <option value="">Select flavor</option>
                <option value="Sweet">Sweet</option>
                <option value="Sour">Sour</option>
                <option value="Bitter">Bitter</option>
                <option value="Savory/Umami">Savory / Umami</option>
                <option value="Fruity">Fruity</option>
                <option value="Herbal">Herbal</option>
                <option value="Spicy">Spicy</option>
                <option value="Smoky">Smoky</option>
                <option value="Floral">Floral</option>
                <option value="Refreshing/Citrus">Refreshing / Citrus</option>
                <option value="Creamy">Creamy</option>
                <option value="Complex/Multi-layered">Complex / Multi-layered</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Occasion Type</label>
              <select name="occasion" value={form.occasion} onChange={handleChange} required className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all">
                <option value="">Select occasion</option>
                <option value="Casual Happy Hour">Casual Happy Hour</option>
                <option value="Dinner Party">Dinner Party</option>
                <option value="Date Night">Date Night</option>
                <option value="Summer BBQ">Summer BBQ</option>
                <option value="Holiday Celebration">Holiday Celebration</option>
                <option value="Tiki Party">Tiki Party</option>
                <option value="Brunch">Brunch</option>
                <option value="Big Game Watching">Big Game Watching</option>
                <option value="Wedding Reception">Wedding Reception</option>
                <option value="Corporate Event">Corporate Event</option>
                <option value="Beach Day">Beach Day</option>
                <option value="Late Night Bar">Late Night Bar</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Guest Count</label>
              <select name="guestCount" value={form.guestCount} onChange={handleChange} required className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all">
                <option value="">Select guest count</option>
                <option value="Solo (1)">Solo (1 drink)</option>
                <option value="Couple (2)">Couple (2 drinks)</option>
                <option value="Small Group (3-5)">Small Group (3-5)</option>
                <option value="Medium Group (6-10)">Medium Group (6-10)</option>
                <option value="Large Party (10+)">Large Party (10+)</option>
                <option value="Batch Cocktails for 20+">Batch Cocktails for 20+</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Bar Tools Available</label>
              <input name="barTools" value={form.barTools} onChange={handleChange} placeholder="e.g. shaker, muddler, blender, jigger" className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all" />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Preferred Cocktail Style</label>
              <select name="cocktailStyle" value={form.cocktailStyle} onChange={handleChange} className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all">
                <option value="">Select style</option>
                <option value="Classic">Classic / Timeless</option>
                <option value="Modern/Twist">Modern / Twist on Classic</option>
                <option value="Tiki/Tropical">Tiki / Tropical</option>
                <option value="Sour">Sour / Egg White</option>
                <option value="Martini/Dry">Martini / Dry</option>
                <option value="Fizz/Spritzer">Fizz / Spritzer</option>
                <option value="Stirred/Spirits-Forward">Stirred / Spirits-Forward</option>
                <option value="Layered/Float">Layered / Float</option>
                <option value="Smoky/Clairfy">Smoky / Clarify</option>
                <option value="No Preference">No Preference</option>
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-gray-300">Dietary / Non-Alcoholic Option</label>
              <select name="nonAlcoholic" value={form.nonAlcoholic} onChange={handleChange} className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all">
                <option value="">Select option</option>
                <option value="Full Alcohol">Full Alcohol — Classic cocktail</option>
                <option value="Low ABV">Low ABV — Lighter alcohol content</option>
                <option value="Mocktail">Mocktail — Non-alcoholic, full flavor</option>
                <option value="Virtue Cocktail">Virtue Cocktail — 0% ABV premium mocktail</option>
              </select>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white font-semibold py-4 rounded-xl transition-all duration-200 text-lg shadow-lg shadow-orange-500/20">
            {loading ? "Mixing Cocktail..." : "Generate Cocktail Recipe"}
          </button>
        </form>

        {output && (
          <div className="bg-gray-800/40 border border-gray-700 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-orange-400 mb-4">Cocktail Recipe</h2>
            <div className="prose prose-invert prose-orange max-w-none text-gray-200 whitespace-pre-wrap text-sm leading-relaxed">{output}</div>
          </div>
        )}
      </div>
    </main>
  );
}
