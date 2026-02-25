import { useEffect, useState } from 'react';
import http from '../api/http';
import PropertyCard from '../components/PropertyCard';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const load = async () => {
    const { data } = await http.get('/users/favorites');
    setFavorites(data);
  };

  useEffect(() => { load(); }, []);

  return (
    <section className="container-x py-10">
      <h1 className="text-3xl font-bold">Saved Favorites</h1>
      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {favorites.map((item) => <PropertyCard key={item._id} property={item} onFavorite={load} />)}
      </div>
    </section>
  );
}
