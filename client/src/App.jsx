const featuredHomes = [
  {
    title: 'Oceanview Villa',
    location: 'Malibu, California',
    price: '$3,250,000',
    details: '5 bed • 4 bath • 4,800 sqft',
    tag: 'Luxury'
  },
  {
    title: 'Downtown Penthouse',
    location: 'Austin, Texas',
    price: '$1,150,000',
    details: '3 bed • 3 bath • 2,300 sqft',
    tag: 'City Living'
  },
  {
    title: 'Suburban Family Home',
    location: 'Raleigh, North Carolina',
    price: '$610,000',
    details: '4 bed • 3 bath • 3,000 sqft',
    tag: 'Best Value'
  }
];

const services = [
  {
    heading: 'Buy A Home',
    text: 'Browse curated listings with virtual tours and neighborhood insights.'
  },
  {
    heading: 'Sell Faster',
    text: 'Get strategic pricing guidance and exposure to qualified buyers.'
  },
  {
    heading: 'Rent Smarter',
    text: 'Discover rental properties that match your budget and lifestyle.'
  }
];

export default function App() {
  return (
    <div className="page">
      <header className="hero">
        <nav className="nav">
          <h1 className="brand">EstateFlow</h1>
          <button className="cta">Contact Agent</button>
        </nav>

        <div className="hero-content">
          <p className="eyebrow">Trusted by 10,000+ homeowners</p>
          <h2>Find your next property with confidence.</h2>
          <p>
            Explore modern homes, luxury apartments, and family-friendly neighborhoods in top cities.
          </p>
          <div className="hero-actions">
            <button className="primary">Browse Listings</button>
            <button className="secondary">Book Consultation</button>
          </div>
        </div>
      </header>

      <main>
        <section className="section">
          <h3>Featured Listings</h3>
          <div className="grid homes">
            {featuredHomes.map((home) => (
              <article key={home.title} className="card home-card">
                <span className="tag">{home.tag}</span>
                <h4>{home.title}</h4>
                <p>{home.location}</p>
                <p>{home.details}</p>
                <strong>{home.price}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <h3>What We Offer</h3>
          <div className="grid services">
            {services.map((service) => (
              <article key={service.heading} className="card">
                <h4>{service.heading}</h4>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
