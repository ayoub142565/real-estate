import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import http from '../api/http';
import LoadingSkeleton from '../components/LoadingSkeleton';
import PropertyCard from '../components/PropertyCard';
import PropertyFilters from '../components/PropertyFilters';

const initialFilters = {
  keyword: '',
  location: '',
  status: '',
  type: '',
  minPrice: '',
  maxPrice: '',
  bedrooms: '',
  bathrooms: '',
  sort: 'newest'
};

export default function PropertyListingPage() {
  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ items: [], pagination: { pages: 1 } });
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const params = { ...filters, page, limit: 9 };
    const { data: res } = await http.get('/properties', { params });
    setData(res);
    setLoading(false);
  };

  useEffect(() => { load(); }, [page]);

  return (
    <section className="container-x py-10">
      <Helmet><title>Property Listings | EstatePro</title></Helmet>
      <h1 className="mb-6 text-3xl font-bold">Explore Properties</h1>
      <PropertyFilters filters={filters} setFilters={setFilters} onApply={() => { setPage(1); load(); }} />

      <div className="mt-8">{loading ? <LoadingSkeleton cards={9} /> : <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{data.items.map((item) => <PropertyCard key={item._id} property={item} onFavorite={load} />)}</div>}</div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="rounded border px-4 py-2 disabled:opacity-40">Previous</button>
        <span>{page} / {data.pagination.pages || 1}</span>
        <button disabled={page >= data.pagination.pages} onClick={() => setPage((p) => p + 1)} className="rounded border px-4 py-2 disabled:opacity-40">Next</button>
      </div>
    </section>
  );
}
