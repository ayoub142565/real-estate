import MapEmbed from '../components/MapEmbed';

export default function ContactPage() {
  return (
    <section className="container-x py-10">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <form className="space-y-3 rounded-2xl bg-white p-6 shadow-card">
          <input placeholder="Name" className="w-full rounded border px-3 py-2" />
          <input placeholder="Email" className="w-full rounded border px-3 py-2" />
          <textarea rows="5" placeholder="Message" className="w-full rounded border px-3 py-2" />
          <button className="rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white">Send Message</button>
        </form>
        <div>
          <MapEmbed latitude={37.7749} longitude={-122.4194} height="h-80" />
          <div className="mt-4 rounded-xl bg-white p-4 shadow-card">
            <p>123 Market Street, San Francisco</p>
            <p>+1 (555) 010-2233</p>
            <p>hello@estatepro.com</p>
          </div>
        </div>
      </div>
    </section>
  );
}
