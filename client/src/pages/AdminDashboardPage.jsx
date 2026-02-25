import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { inquiryService, propertyService, userService } from '../services/store';

const initial = {
  title: '', description: '', price: '', location: '', address: '', latitude: '', longitude: '',
  type: 'apartment', status: 'sale', bedrooms: 0, bathrooms: 0, area: '', amenities: '', featured: false
};

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [form, setForm] = useState(initial);
  const [properties, setProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  const load = () => {
    setProperties(propertyService.list({ limit: 100, sort: 'newest' }).items);
    setUsers(userService.list());
    setInquiries(inquiryService.list());
  };

  useEffect(() => { load(); }, []);

  const createProperty = (e) => {
    e.preventDefault();
    propertyService.create({
      ...form,
      price: Number(form.price),
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      area: Number(form.area),
      amenities: form.amenities.split(',').map((x) => x.trim()).filter(Boolean)
    }, user);
    setForm(initial);
    load();
  };

  const removeProperty = (id) => {
    propertyService.remove(id);
    load();
  };

  return (
    <section className="container-x space-y-10 py-10">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <form onSubmit={createProperty} className="grid gap-3 rounded-2xl bg-white p-6 shadow-card md:grid-cols-3">
        {Object.entries(form).map(([key, value]) => (
          key !== 'featured' ? (
            <input key={key} value={value} placeholder={key} onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))} className="rounded border px-3 py-2" required={['title', 'description', 'price', 'location', 'address', 'latitude', 'longitude', 'area'].includes(key)} />
          ) : (
            <label key={key} className="flex items-center gap-2"><input type="checkbox" checked={form.featured} onChange={(e) => setForm((prev) => ({ ...prev, featured: e.target.checked }))} /> Featured</label>
          )
        ))}
        <button className="rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white">Add Property</button>
      </form>

      <div className="rounded-2xl bg-white p-6 shadow-card">
        <h2 className="text-xl font-semibold">Manage Listings</h2>
        <div className="mt-4 space-y-2">
          {properties.map((item) => (
            <div key={item._id} className="flex items-center justify-between border-b py-2">
              <span>{item.title}</span>
              <button onClick={() => removeProperty(item._id)} className="text-sm text-red-600">Delete</button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-card"><h2 className="text-xl font-semibold">Users</h2><p className="mt-2 text-slate-500">Total users: {users.length}</p></div>
        <div className="rounded-2xl bg-white p-6 shadow-card"><h2 className="text-xl font-semibold">Inquiries</h2><p className="mt-2 text-slate-500">Total inquiries: {inquiries.length}</p></div>
      </div>
    </section>
  );
}
