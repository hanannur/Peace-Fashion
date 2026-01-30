export const ProductCard = ({ product }: any) => (
  <div className="group border border-slate-100 p-4 hover:shadow-lg transition-all bg-white">
    <div className="aspect-[3/4] overflow-hidden bg-slate-50 mb-4">
      <img 
        src={product.image} 
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        onError={(e) => {(e.target as HTMLImageElement).src = "https://placehold.co/400x600?text=Minimal+Style"}}
      />
    </div>
    <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-900">{product.name}</h3>
    <div className="flex justify-between mt-2 items-center">
      <p className="text-[10px] text-slate-400 uppercase">{product.category}</p>
      <p className="text-xs font-bold text-slate-900">${product.price}</p>
    </div>
  </div>
);