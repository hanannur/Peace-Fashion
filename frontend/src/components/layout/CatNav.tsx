"use client";


  const categories = [
  { name: "ALL", slug: "all" },
  { name: "ABAYA", slug: "abaya" },
  { name: "KHIMAR", slug: "khimar" },
  { name: "NIQAB", slug: "niqab" },
  { name: "BURQA", slug: "burqa" },
  { name: "ACCESSORIES", slug: "accessories" },
];


interface CategoryNavProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export default function CategoryNav({ activeCategory, setActiveCategory }: CategoryNavProps) {
  return (
    <nav className="w-full border-b border-s-border bg-background sticky top-0 z-10 transition-colors duration-300">
      <div className="flex justify-center space-x-8 py-4 px-6 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActiveCategory(cat.slug)}
            className={`text-[10px] font-medium tracking-[0.2em] uppercase transition-colors whitespace-nowrap ${
              activeCategory === cat.slug 
              ? "text-foreground border-b border-foreground pb-1" 
              : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </nav>
  );
}