
import React, { useState } from "react";
import ReactDOM from "react-dom";

const co2eData = {
  materials: {
    "ReBoard": { co2e: 1.1, tooltip: "FSC-certified rigid paper board. Lightweight and fully recyclable." },
    "Kappa": { co2e: 1.7, tooltip: "Polystyrene core with paper facings." },
    "Foam Board": { co2e: 3.0, tooltip: "PVC foam core, high embodied carbon." },
    "Recycled Polyester": { co2e: 1.4, tooltip: "Made from post-consumer plastic, approx. 30–50% less CO₂e." },
    "Virgin Polyester": { co2e: 2.1, tooltip: "Standard PET-based fabric." }
  },
  inks: {
    "Latex": { co2e: 0.03, tooltip: "Water-based latex ink with low VOC emissions." },
    "UV": { co2e: 0.07, tooltip: "High-energy curing and VOC generation." },
    "Solvent": { co2e: 0.06, tooltip: "Traditional ink using petrochemical solvents." }
  },
  disposal: {
    "Recycled": { offset: -0.4, tooltip: "Reduces emissions from landfill disposal and offsets virgin material production." },
    "Landfill": { offset: 0, tooltip: "No offset benefit; emissions remain unchanged." },
    "Reused": { offset: -0.7, tooltip: "Assumes multi-use of materials, lowering overall impact." }
  }
};

function SourcesPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 text-gray-800 font-sans">
      <h1 className="text-2xl font-bold text-pink-700 mb-6">Sources & Methodology</h1>
      <ul className="list-disc ml-6 space-y-2 text-sm">
        <li><strong>ReBoard:</strong> ReBoard Environmental Profile (2023)</li>
        <li><strong>Kappa:</strong> Generic EPD Data for Foam Core Boards</li>
        <li><strong>Foam Board:</strong> PVC Material Carbon Footprint Study</li>
        <li><strong>Recycled Polyester:</strong> Textile Exchange Preferred Fiber Report (2021)</li>
        <li><strong>Virgin Polyester:</strong> PlasticsEurope Lifecycle Inventory Data (2020)</li>
        <li><strong>Latex Ink:</strong> HP Latex Technology Environmental Report (2022)</li>
        <li><strong>UV Ink:</strong> European Printing Ink Association Report (2021)</li>
        <li><strong>Solvent Ink:</strong> VOC Emissions and Ink Lifecycle Report</li>
        <li><strong>Recycled Disposal:</strong> EPA Waste Management Hierarchy (2020)</li>
        <li><strong>Landfill Disposal:</strong> IPCC Waste Emissions Guidelines</li>
        <li><strong>Reused Disposal:</strong> Circular Economy Foundation Case Studies</li>
      </ul>
    </div>
  );
}

function ImpactPortalMockup() {
  const [media, setMedia] = useState("Recycled Polyester");
  const [ink, setInk] = useState("Latex");
  const [area, setArea] = useState(0);
  const [disposal, setDisposal] = useState("Recycled");
  const [showSources, setShowSources] = useState(false);

  if (showSources) return <SourcesPage />;

  const mediaData = co2eData.materials[media];
  const inkData = co2eData.inks[ink];
  const disposalData = co2eData.disposal[disposal];

  const baseEmissions = area * (mediaData.co2e + inkData.co2e);
  const adjustedEmissions = baseEmissions + baseEmissions * disposalData.offset;
  const savedEmissions = area * (co2eData.materials["Foam Board"].co2e + co2eData.inks["UV"].co2e) - adjustedEmissions;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-pink-50 text-gray-800 px-6 py-10 font-sans">
      <h1 className="text-3xl font-bold text-pink-700 mb-6">The Print Factory - Impact Portal</h1>
      <form className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-1" title={mediaData.tooltip}>Media Type</label>
          <select value={media} onChange={e => setMedia(e.target.value)} className="w-full border p-2 rounded">
            {Object.keys(co2eData.materials).map(m => <option key={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" title={inkData.tooltip}>Ink Type</label>
          <select value={ink} onChange={e => setInk(e.target.value)} className="w-full border p-2 rounded">
            {Object.keys(co2eData.inks).map(i => <option key={i}>{i}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Area (m²)</label>
          <input type="number" value={area} onChange={e => setArea(parseFloat(e.target.value) || 0)} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" title={disposalData.tooltip}>End-of-Life Handling</label>
          <select value={disposal} onChange={e => setDisposal(e.target.value)} className="w-full border p-2 rounded">
            {Object.keys(co2eData.disposal).map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
      </form>
      <div className="mt-8 bg-white border p-4 rounded shadow-sm text-sm space-y-2">
        <p><strong>Total Emissions:</strong> {adjustedEmissions.toFixed(2)} kg CO₂e</p>
        <p><strong>CO₂ Saved vs Traditional:</strong> {savedEmissions.toFixed(2)} kg CO₂e</p>
        <p><strong>Equivalent to:</strong> {(adjustedEmissions * 3.6).toFixed(1)} km driven</p>
        <p className="text-xs text-gray-500 mt-2">
          Based on 3rd party environmental declarations.
          <button className="underline ml-1" onClick={() => setShowSources(true)}>See full source list</button>
        </p>
      </div>
    </div>
  );
}

ReactDOM.render(<ImpactPortalMockup />, document.getElementById("root"));
