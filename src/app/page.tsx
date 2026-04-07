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
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30">
            <span className="text-cyan-400 text-sm font-medium">🍸 AI × Food & Cooking</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">AI Cocktail & Mixology Recipe Generator</h1>
          <p className="text-gray-400 text-lg">Generate cocktail recipes with ingredients, instructions, and garnishes</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Base Spirit Preference</label>
              <select name="spirit" value={form.spirit} onChange={handleChange} required className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-sm">
                <option value="">Select spirit</option>
                <option value="vodka">Vodka</option>
                <option value="gin">Gin</option>
                <option value="rum">Rum (White or Dark)</option>
                <option value="tequila">Tequila (Blanco or Reposado)</option>
                <option value="whiskey">Whiskey / Bourbon</option>
                <option value="brandy">Brandy / Cognac</option>
                <option value="mezcal">Mezcal</option>
                <option value="scotch">Scotch</option>
                <option value="aperol">Aperol / Campari</option>
                <option value="wine">Wine / Vermouth</option>
                <option value="no-spirit">Spirit-Free</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Flavor Profile</label>
              <select name="flavorProfile" value={form.flavorProfile} onChange={handleChange} required className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-sm">
                <option value="">Select flavor</option>
                <option value="sweet">Sweet</option>
                <option value="sour">Sour</option>
                <option value="bitter">Bitter</option>
                <option value="savory">Savory / Umami</option>
                <option value="refreshing">Refreshing / Light</option>
                <option value="smoky">Smoky</option>
                <option value="fruity">Fruity</option>
                <option value="floral">Floral</option>
                <option value="spicy">Spicy</option>
                <option value="herbal">Herbal</option>
                <option value="tropical">Tropical</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Occasion Type</label>
              <select name="occasion" value={form.occasion} onChange={handleChange} required className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-sm">
                <option value="">Select occasion</option>
                <option value="dinner-party">Dinner Party</option>
                <option value="happy-hour">Happy Hour / Aperitif</option>
                <option value="holiday">Holiday / Celebration</option>
                <option value="summer-party">Summer Party / BBQ</option>
                <option value="date-night">Date Night</option>
                <option value="brunch">Brunch</option>
                <option value="big-batch">Big Batch / Punch</option>
                <option value="after-dinner">After Dinner / Digestif</option>
                <option value="casual">Casual / Everyday</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Available Bar Tools</label>
              <input type="text" name="barTools" value={form.barTools} onChange={handleChange} required className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-sm" placeholder="e.g. shaker, muddler, strainer, blender, jigger" />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Guest Count</label>
              <select name="guestCount" value={form.guestCount} onChange={handleChange} required className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-sm">
                <option value="">Select guest count</option>
                <option value="1">1 (Solo / Personal)</option>
                <option value="2">2 people</option>
                <option value="4">4 people</option>
                <option value="6">6 people</option>
                <option value="8">8 people</option>
                <option value="10+">10+ people (Batch)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Preferred Cocktail Style</label>
              <select name="cocktailStyle" value={form.cocktailStyle} onChange={handleChange} required className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-sm">
                <option value="">Select style</option>
                <option value="classic">Classic (Old Fashioned, Martini, etc.)</option>
                <option value="tiki">Tiki / Exotic</option>
                <option value="modern">Modern / Contemporary</option>
                <option value="fizzy">Fizzy / Effervescent</option>
                <option value="creamy">Creamy / Dessert</option>
                <option value="bitter-complex">Bitter & Complex</option>
                <option value="fresh-light">Fresh & Light</option>
                <option value="smoky">Smoky & Bold</option>
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-gray-300">Dietary / Non-Alcoholic Option</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "full-alcohol", label: "🍸 Full Alcohol", desc: "Standard cocktail" },
                  { value: "low-abv", label: "🌿 Low ABV", desc: "Light / Spritz style" },
                  { value: "mocktail", label: "🍹 Mocktail", desc: "Zero alcohol" },
                ].map((opt) => (
                  <label key={opt.value} className={`flex flex-col items-center gap-1 p-3 rounded-xl border cursor-pointer transition-all text-center ${form.nonAlcoholic === opt.value ? "border-cyan-500 bg-cyan-500/10" : "border-gray-700 bg-gray-800/30 hover:border-gray-600"}`}>
                    <input type="radio" name="nonAlcoholic" value={opt.value} checked={form.nonAlcoholic === opt.value} onChange={handleChange} className="sr-only" />
                    <span className={`text-sm font-medium ${form.nonAlcoholic === opt.value ? "text-cyan-400" : "text-gray-300"}`}>{opt.label}</span>
                    <span className="text-xs text-gray-500">{opt.desc}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-500/50 text-white font-semibold py-4 rounded-xl transition-all duration-200 text-base flex items-center justify-center gap-2">
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                Mixing Your Cocktail...
              </>
            ) : "🍸 Generate My Cocktail Recipe"}
          </button>
        </form>

        {output && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-semibold text-cyan-400 mb-4">Cocktail Recipe</h2>
            <div className="prose prose-invert prose-cyan max-w-none text-gray-200 whitespace-pre-wrap text-sm leading-relaxed">{output}</div>
          </div>
        )}
      </div>
    </main>
  );
}
