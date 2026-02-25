export default function Footer() {
  return (
    <footer className="mt-16 bg-slate-900 py-12 text-slate-200">
      <div className="container-x grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="text-xl font-bold text-white">EstatePro</h3>
          <p className="mt-2 text-sm">Find your next home with trusted listings, local experts, and smart search tools.</p>
        </div>
        <div>
          <h4 className="font-semibold text-white">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Buy</li><li>Rent</li><li>Commercial</li><li>Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white">Office</h4>
          <p className="mt-3 text-sm">123 Market Street, San Francisco, CA</p>
          <p className="text-sm">+1 (555) 010-2233</p>
          <p className="text-sm">hello@estatepro.com</p>
        </div>
      </div>
    </footer>
  );
}
