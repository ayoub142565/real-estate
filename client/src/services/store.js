import { sampleProperties } from '../data/properties';

const KEY = {
  PROPERTIES: 'estatepro.properties',
  USERS: 'estatepro.users',
  INQUIRIES: 'estatepro.inquiries',
  CURRENT_USER: 'user'
};

const read = (key, fallback) => {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : fallback;
};

const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export const bootstrapStore = () => {
  if (!localStorage.getItem(KEY.PROPERTIES)) write(KEY.PROPERTIES, sampleProperties);
  if (!localStorage.getItem(KEY.USERS)) {
    write(KEY.USERS, [
      { id: 'u-admin', name: 'Admin User', email: 'admin@estatepro.com', password: 'Admin123!', role: 'admin', favorites: [] }
    ]);
  }
  if (!localStorage.getItem(KEY.INQUIRIES)) write(KEY.INQUIRIES, []);
};

export const authService = {
  login: ({ email, password }) => {
    const users = read(KEY.USERS, []);
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) throw new Error('Invalid credentials');
    const safeUser = { id: user.id, name: user.name, email: user.email, role: user.role };
    localStorage.setItem('token', 'frontend-only-demo-token');
    localStorage.setItem(KEY.CURRENT_USER, JSON.stringify(safeUser));
    return safeUser;
  },
  register: ({ name, email, password }) => {
    const users = read(KEY.USERS, []);
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) throw new Error('Email already in use');
    const user = { id: crypto.randomUUID(), name, email, password, role: 'user', favorites: [] };
    users.push(user);
    write(KEY.USERS, users);
    const safeUser = { id: user.id, name: user.name, email: user.email, role: user.role };
    localStorage.setItem('token', 'frontend-only-demo-token');
    localStorage.setItem(KEY.CURRENT_USER, JSON.stringify(safeUser));
    return safeUser;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem(KEY.CURRENT_USER);
  }
};

export const propertyService = {
  list: ({ page = 1, limit = 9, ...filters }) => {
    let items = read(KEY.PROPERTIES, []);
    if (filters.keyword) {
      const q = filters.keyword.toLowerCase();
      items = items.filter((p) => [p.title, p.description, p.location, p.address].join(' ').toLowerCase().includes(q));
    }
    if (filters.location) items = items.filter((p) => p.location.toLowerCase().includes(filters.location.toLowerCase()));
    if (filters.status) items = items.filter((p) => p.status === filters.status);
    if (filters.type) items = items.filter((p) => p.type === filters.type);
    if (filters.minPrice) items = items.filter((p) => p.price >= Number(filters.minPrice));
    if (filters.maxPrice) items = items.filter((p) => p.price <= Number(filters.maxPrice));
    if (filters.bedrooms) items = items.filter((p) => p.bedrooms >= Number(filters.bedrooms));
    if (filters.bathrooms) items = items.filter((p) => p.bathrooms >= Number(filters.bathrooms));

    if (filters.sort === 'priceAsc') items.sort((a, b) => a.price - b.price);
    else if (filters.sort === 'priceDesc') items.sort((a, b) => b.price - a.price);
    else items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const total = items.length;
    const start = (Number(page) - 1) * Number(limit);
    return { items: items.slice(start, start + Number(limit)), pagination: { page: Number(page), limit: Number(limit), total, pages: Math.max(1, Math.ceil(total / Number(limit))) } };
  },
  featured: () => read(KEY.PROPERTIES, []).filter((p) => p.featured).slice(0, 6),
  byId: (id) => {
    const all = read(KEY.PROPERTIES, []);
    const property = all.find((p) => p._id === id);
    const similar = all.filter((p) => p._id !== id && p.location === property?.location).slice(0, 4);
    return { property, similar };
  },
  create: (payload, user) => {
    const all = read(KEY.PROPERTIES, []);
    const property = { ...payload, _id: crypto.randomUUID(), createdAt: new Date().toISOString(), images: payload.images?.length ? payload.images : ['https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80'], agentId: { name: user.name, email: user.email } };
    all.unshift(property);
    write(KEY.PROPERTIES, all);
    return property;
  },
  remove: (id) => {
    write(KEY.PROPERTIES, read(KEY.PROPERTIES, []).filter((p) => p._id !== id));
  }
};

export const userService = {
  getFavorites: (userId) => {
    const users = read(KEY.USERS, []);
    const properties = read(KEY.PROPERTIES, []);
    const user = users.find((u) => u.id === userId);
    return properties.filter((p) => user?.favorites?.includes(p._id));
  },
  toggleFavorite: (userId, propertyId) => {
    const users = read(KEY.USERS, []);
    const idx = users.findIndex((u) => u.id === userId);
    if (idx < 0) return;
    const favs = new Set(users[idx].favorites || []);
    if (favs.has(propertyId)) favs.delete(propertyId);
    else favs.add(propertyId);
    users[idx].favorites = [...favs];
    write(KEY.USERS, users);
  },
  list: () => read(KEY.USERS, []).map(({ password, ...safe }) => safe)
};

export const inquiryService = {
  create: (payload, user) => {
    const inquiries = read(KEY.INQUIRIES, []);
    inquiries.unshift({ id: crypto.randomUUID(), ...payload, userId: user?.id || null, createdAt: new Date().toISOString() });
    write(KEY.INQUIRIES, inquiries);
  },
  list: () => read(KEY.INQUIRIES, [])
};
