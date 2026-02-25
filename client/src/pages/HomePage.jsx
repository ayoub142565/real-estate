import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import http from '../api/http';
import PropertyCard from '../components/PropertyCard';
import LoadingSkeleton from '../components/LoadingSkeleton';

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [featuredRes, latestRes] = await Promise.all([
        http.get('/properties/featured'),
        http.get('/properties?limit=6&sort=newest')
      ]);
      setFeatured(featuredRes.data);
      setLatest(latestRes.data.items);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <Helmet><title>EstatePro | Discover Properties</title></Helmet>
      <section className="bg-gradient-to-r from-brand-700 to-brand-500 py-20 text-white">
        <div className="container-x">
          <h1 className="text-4xl font-bold md:text-5xl">Find Your Dream Home Faster</h1>
          <p className="mt-4 max-w-xl text-white/90">Browse premium listings for sale and rent with map-based search and expert local agents.</p>
          <Link to="/properties" className="mt-8 inline-block rounded-xl bg-accent px-6 py-3 font-semibold text-slate-900">Start Searching</Link>
        </div>
      </section>

      <section className="container-x py-14">
        <h2 className="text-3xl font-bold">Featured Properties</h2>
        <div className="mt-6">{loading ? <LoadingSkeleton cards={3} /> : <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{featured.map((item) => <PropertyCard key={item._id} property={item} />)}</div>}</div>
      </section>

      <section className="container-x py-2">
        <h2 className="text-3xl font-bold">Property Categories</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {['Buy Homes', 'Rent Homes', 'Commercial'].map((label) => (
            <div key={label} className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">{label}</h3>
              <p className="mt-2 text-slate-500">High-quality verified listings with transparent pricing and rich photo tours.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x py-14">
        <h2 className="text-3xl font-bold">Latest Listings</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{latest.map((item) => <PropertyCard key={item._id} property={item} />)}</div>
      </section>

      <section className="container-x grid gap-8 py-10 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-8 shadow-card"><h3 className="text-2xl font-bold">Why Choose Us</h3><p className="mt-3 text-slate-600">Data-driven recommendations, verified agents, and transparent property intelligence.</p></div>
        <div className="rounded-2xl bg-white p-8 shadow-card"><h3 className="text-2xl font-bold">Testimonials</h3><p className="mt-3 text-slate-600">“EstatePro made our first home purchase stress-free and fast.”</p></div>
      </section>

      <section className="container-x pb-14">
        <div className="rounded-3xl bg-slate-900 px-8 py-12 text-center text-white">
          <h2 className="text-3xl font-bold">Ready to sell your property?</h2>
          <p className="mt-3 text-slate-300">List with our network and reach high-intent buyers.</p>
        </div>
      </section>
    </>
  );
}
