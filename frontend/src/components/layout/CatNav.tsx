"use client";

const categories = [
  { name: "ALL", slug: "all" },
  { name: "NEW ARRIVALS", slug: "new" },
  { name: "ABAYAS", slug: "abayas" },
  { name: "THOBES", slug: "thobes" },
  { name: "KIDS", slug: "kids" },
  { name: "HIJABS", slug: "hijabs" },
  { name: "ACCESSORIES", slug: "accessories" },
];

interface CategoryNavProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export default function CategoryNav({ activeCategory, setActiveCategory }: CategoryNavProps) {
  return (
    <nav className="w-full border-b border-slate-100 bg-white sticky top-0 z-10">
      <div className="flex justify-center space-x-8 py-4 px-6 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActiveCategory(cat.slug)}
            className={`text-[10px] font-medium tracking-[0.2em] uppercase transition-colors whitespace-nowrap ${
              activeCategory === cat.slug 
              ? "text-black border-b border-black pb-1" 
              : "text-slate-400 hover:text-black"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </nav>
  );
}