import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Property from '../models/Property.js';

dotenv.config();
await connectDB();

await Promise.all([User.deleteMany(), Property.deleteMany()]);

const admin = await User.create({
  name: 'Admin User',
  email: 'admin@estatepro.com',
  password: 'Admin123!',
  role: 'admin'
});

await Property.insertMany([
  {
    title: 'Modern Skyline Apartment',
    description: 'Luxury apartment with city skyline views and premium amenities.',
    price: 540000,
    location: 'New York',
    address: '25 Hudson Yards, NY',
    latitude: 40.7549,
    longitude: -74.0021,
    type: 'apartment',
    status: 'sale',
    bedrooms: 2,
    bathrooms: 2,
    area: 1300,
    amenities: ['Pool', 'Gym', 'Doorman'],
    images: ['https://images.unsplash.com/photo-1460317442991-0ec209397118'],
    featured: true,
    agentId: admin._id
  },
  {
    title: 'Suburban Family House',
    description: 'Spacious family home close to schools and parks.',
    price: 3200,
    location: 'Austin',
    address: '1406 Lakeside Dr, Austin, TX',
    latitude: 30.2672,
    longitude: -97.7431,
    type: 'house',
    status: 'rent',
    bedrooms: 4,
    bathrooms: 3,
    area: 2400,
    amenities: ['Garage', 'Garden', 'Smart Home'],
    images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994'],
    featured: true,
    agentId: admin._id
  }
]);

// eslint-disable-next-line no-console
console.log('Seed complete');
process.exit(0);
