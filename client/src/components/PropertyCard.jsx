import { Bath, BedDouble, Heart, MapPin, Ruler } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { userService } from '../services/store';

export default function PropertyCard({ property, onFavorite }) {
  const { user } = useAuth();
  const image = property.images?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6';

  const handleFavorite = () => {
    if (!user) return;
    userService.toggleFavorite(user.id, property._id);
    onFavorite?.();
  };

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-card">
      <div className="relative">
        <img src={`${image}${image.includes('?') ? '&' : '?'}w=900&q=70`} alt={property.title} loading="lazy" className="h-52 w-full object-cover" />
        <button onClick={handleFavorite} className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-brand-700">
          <Heart size={18} />
        </button>
      </div>
      <div className="p-4">
        <p className="text-2xl font-bold text-brand-700">${property.price.toLocaleString()}</p>
        <Link to={`/properties/${property._id}`} className="mt-1 block font-semibold hover:text-brand-600">{property.title}</Link>
        <p className="mt-1 flex items-center gap-1 text-sm text-slate-500"><MapPin size={14} /> {property.address}</p>
        <div className="mt-4 grid grid-cols-3 text-sm text-slate-600">
          <span className="flex items-center gap-1"><BedDouble size={14} /> {property.bedrooms}</span>
          <span className="flex items-center gap-1"><Bath size={14} /> {property.bathrooms}</span>
          <span className="flex items-center gap-1"><Ruler size={14} /> {property.area} sqft</span>
        </div>
      </div>
    </article>
  );
}
