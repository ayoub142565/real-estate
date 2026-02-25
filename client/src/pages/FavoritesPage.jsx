import { useEffect, useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import { useAuth } from '../contexts/AuthContext';
import { userService } from '../services/store';

export default function FavoritesPage() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  const load = () => {
    if (!user) return;
    setFavorites(userService.getFavorites(user.id));
  };

  useEffect(() => { load(); }, [user]);

  return (
    <section className="container-x py-10">
      <h1 className="text-3xl font-bold">Saved Favorites</h1>
      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {favorites.map((item) => <PropertyCard key={item._id} property={item} onFavorite={load} />)}
      </div>
    </section>
  );
}
