"use client";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    baseSpirit: "",
    flavorProfile: "",
    occasion: "",
    glassware: "",
    guestCount: "",
    nonAlcoholic: "",
  });
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.baseSpirit || !form.flavorProfile) { setError("Please fill in spirit and flavor."); return; }
    setLoading(true);
    setError("");
    setOutput("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setOutput(data.result || "");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-white px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30">
            <span className="text-violet-400 text-sm font-medium">🍸 AI × Food & Cooking</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">AI Cocktail & Mixology Generator</h1>
          <p className="text-gray-400 text-lg">Generate craft cocktail recipes with ingredients, instructions & garnishes</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Base Spirit *</label>
              <select name="baseSpirit" value={form.baseSpirit} onChange={handleChange} required
                className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all text-sm">
                <option value="">Select spirit</option>
                <option value="vodka">Vodka</option>
                <option value="gin">Gin</option>
                <option value="whiskey">Whiskey / Bourbon</option>
                <option value="rum">Rum (White or Dark)</option>
                <option value="tequila">Tequila (Blanco or Reposado)</option>
                <option value="mezcal">Mezcal</option>
                <option value="brandy">Brandy / Cognac</option>
                <option value="schnapps">Schnapps</option>
                <option value="non-alcoholic">Non-Alcoholic / Mocktail</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Flavor Profile *</label>
              <select name="flavorProfile" value={form.flavorProfile} onChange={handleChange} required
                className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all text-sm">
                <option value="">Select flavor</option>
                <option value="sweet">Sweet & Fruity</option>
                <option value="sour">Sour & Tangy</option>
                <option value="bitter">Bitter & Herbal</option>
                <option value="savory">Savory & Smoky</option>
                <option value="refreshing">Refreshing & Citrusy</option>
                <option value="creamy">Creamy & Indulgent</option>
                <option value="spicy">Spicy & Bold</option>
                <option value="floral">Floral & Delicate</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Occasion</label>
              <select name="occasion" value={form.occasion} onChange={handleChange}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all text-sm">
                <option value="">Any occasion</option>
                <option value="party">House Party</option>
                <option value="dinner">Dinner Party</option>
                <option value="date">Date Night</option>
                <option value="summer">Summer / Poolside</option>
                <option value="winter">Winter / Fireside</option>
                <option value="brunch">Brunch</option>
                <option value="celebration">Celebration / Toast</option>
                <option value="relaxing">Relaxing Evening</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Glassware Available</label>
              <select name="glassware" value={form.glassware} onChange={handleChange}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all text-sm">
                <option value="">Any glassware</option>
                <option value="martini">Martini / Cocktail</option>
                <option value="rocks">Rocks / Old Fashioned</option>
                <option value="highball">Highball / Collins</option>
                <option value="flute">Champagne Flute</option>
                <option value="wine">Wine Glass</option>
                <option value="mason">Mason Jar</option>
                <option value="copper">Copper Mug</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Number of Guests</label>
              <input type="number" name="guestCount" value={form.guestCount} onChange={handleChange} min="1" max="50"
                className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all text-sm"
                placeholder="e.g. 4" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Style</label>
              <select name="nonAlcoholic" value={form.nonAlcoholic} onChange={handleChange}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all text-sm">
                <option value="false">Alcoholic</option>
                <option value="true">Non-Alcoholic Mocktail</option>
              </select>
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-violet-600 hover:bg-violet-500 disabled:bg-violet-600/50 text-white font-semibold py-4 rounded-xl transition-all duration-200 text-base flex items-center justify-center gap-2">
            {loading ? (
              <><svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Mixing...</>
            ) : "🍸 Generate Cocktail Recipe"}
          </button>
        </form>

        {error && <div className="bg-red-900/30 border border-red-700 rounded-xl p-4 text-red-300 text-sm">{error}</div>}

        {output && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-semibold text-violet-400 mb-4">Cocktail Recipe</h2>
            <div className="prose prose-invert prose-violet max-w-none text-gray-200 whitespace-pre-wrap text-sm leading-relaxed">{output}</div>
          </div>
        )}
      </div>
    </main>
  );
}
