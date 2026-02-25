import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import http from '../api/http';
import PropertyCard from '../components/PropertyCard';
import MapEmbed from '../components/MapEmbed';

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const [payload, setPayload] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    http.get(`/properties/${id}`).then(({ data }) => setPayload(data));
  }, [id]);

  if (!payload) return <section className="container-x py-10">Loading...</section>;
  const { property, similar } = payload;

  const sendInquiry = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    await http.post('/inquiries', {
      propertyId: property._id,
      name: form.get('name'),
      email: form.get('email'),
      message: form.get('message')
    });
    setMessage('Thanks! The agent will contact you soon.');
    e.currentTarget.reset();
  };

  return (
    <section className="container-x py-10">
      <Helmet><title>{property.title} | EstatePro</title></Helmet>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <img src={property.images?.[0]} alt={property.title} className="h-96 w-full rounded-2xl object-cover" />
          <div className="mt-4 grid gap-3 md:grid-cols-3">{property.images?.slice(1, 4).map((img) => <img key={img} src={img} className="h-28 w-full rounded-xl object-cover" />)}</div>
          <h1 className="mt-6 text-3xl font-bold">{property.title}</h1>
          <p className="mt-2 text-2xl font-bold text-brand-700">${property.price.toLocaleString()}</p>
          <p className="mt-4 text-slate-600">{property.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">{property.amenities?.map((a) => <span key={a} className="rounded-full bg-brand-50 px-3 py-1 text-sm text-brand-700">{a}</span>)}</div>
          <div className="mt-6"><MapEmbed latitude={property.latitude} longitude={property.longitude} /></div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl bg-white p-5 shadow-card">
            <h3 className="text-lg font-semibold">Contact Agent</h3>
            <p className="text-sm text-slate-500">{property.agentId?.name} · {property.agentId?.email}</p>
            <form className="mt-4 space-y-3" onSubmit={sendInquiry}>
              <input name="name" required placeholder="Your name" className="w-full rounded border px-3 py-2" />
              <input name="email" required type="email" placeholder="Your email" className="w-full rounded border px-3 py-2" />
              <textarea name="message" required rows="4" placeholder="I am interested in this property..." className="w-full rounded border px-3 py-2" />
              <button className="w-full rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white">Send Inquiry</button>
              {message && <p className="text-sm text-emerald-600">{message}</p>}
            </form>
          </div>
        </aside>
      </div>

      <h2 className="mt-12 text-2xl font-bold">Similar Properties</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">{similar.map((item) => <PropertyCard key={item._id} property={item} />)}</div>
    </section>
  );
}
