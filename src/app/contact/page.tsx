import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="p-10 max-w-3xl mx-auto text-bluebg">
      <h1 className="text-3xl font-bold mb-6 md:pt-20">
        Contact Emmaculate College
      </h1>

      <section className="space-y-4">
        <p>
          Got questions about admissions, academics, or school programs?
          We&apos;d love to hear from you. Reach out using any of the methods
          below:
        </p>

        <div>
          <h2 className="text-xl font-semibold mt-4">📍 Address</h2>
          <p>5 Ibikunle Street, Maidan, Mile 12, Lagos State, Nigeria</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mt-4">📞 Phone</h2>
          <p>
            <Link href="tel:+2347064369964" className="hover:underline">
              +234706 436 9964
            </Link>
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mt-4">✉️ Email</h2>
          <p>
            <Link
              href="mailto:emmaculate@gmail.com"
              className="hover:underline"
            >
              emmaculate@gmail.com
            </Link>
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mt-4">💬 WhatsApp</h2>
          <p>
            <Link
              href="https://wa.me/2349035078430"
              target="_blank"
              className="hover:underline"
            >
              Chat on WhatsApp
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
