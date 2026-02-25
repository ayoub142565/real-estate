export default function PropertyFilters({ filters, setFilters, onApply }) {
  const update = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="rounded-2xl bg-white p-4 shadow-card">
      <div className="grid gap-3 md:grid-cols-4">
        <input placeholder="Keyword" className="rounded-lg border px-3 py-2" value={filters.keyword} onChange={(e) => update('keyword', e.target.value)} />
        <input placeholder="Location" className="rounded-lg border px-3 py-2" value={filters.location} onChange={(e) => update('location', e.target.value)} />
        <select className="rounded-lg border px-3 py-2" value={filters.status} onChange={(e) => update('status', e.target.value)}>
          <option value="">Status</option><option value="sale">Buy</option><option value="rent">Rent</option>
        </select>
        <select className="rounded-lg border px-3 py-2" value={filters.type} onChange={(e) => update('type', e.target.value)}>
          <option value="">Type</option><option value="apartment">Apartment</option><option value="house">House</option><option value="villa">Villa</option><option value="land">Land</option>
        </select>
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-4">
        <input type="number" placeholder="Min Price" className="rounded-lg border px-3 py-2" value={filters.minPrice} onChange={(e) => update('minPrice', e.target.value)} />
        <input type="number" placeholder="Max Price" className="rounded-lg border px-3 py-2" value={filters.maxPrice} onChange={(e) => update('maxPrice', e.target.value)} />
        <input type="number" placeholder="Bedrooms" className="rounded-lg border px-3 py-2" value={filters.bedrooms} onChange={(e) => update('bedrooms', e.target.value)} />
        <select className="rounded-lg border px-3 py-2" value={filters.sort} onChange={(e) => update('sort', e.target.value)}>
          <option value="newest">Newest</option><option value="priceAsc">Price low → high</option><option value="priceDesc">Price high → low</option>
        </select>
      </div>
      <button onClick={onApply} className="mt-4 rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white">Apply Filters</button>
    </div>
  );
}
