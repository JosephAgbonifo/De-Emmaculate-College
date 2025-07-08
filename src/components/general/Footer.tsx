import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-text text-[#e0fbfc] p-10 no-print">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        <div>
          <h5 className="text-lg font-bold font-poppins mb-2">🏫 Address</h5>
          <p>5 Ibikunle Street, Maidan, Mile 12, Lagos State, Nigeria</p>
        </div>

        <div>
          <h5 className="text-lg font-bold font-poppins mb-2">📞 Contact Us</h5>
          <p>
            <strong>Phone:</strong>{" "}
            <a href="tel:+2347064369964" className="hover:underline">
              +234706 436 9964
            </a>
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:emmaculate@gmail.com" className="hover:underline">
              emmaculate@gmail.com
            </a>
          </p>
        </div>

        <div>
          <h5 className="text-lg font-bold font-poppins mb-2">
            🔗 Quick Links
          </h5>
          <ul className="space-y-1">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/#about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="/admission" className="hover:underline">
                Admissions
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 flex flex-col md:flex-row justify-between items-center text-sm text-[#e0fbfc] border-t border-[#e0fbfc]/30 pt-6">
        <p>
          &copy; {new Date().getFullYear()} Emmaculate College. All rights
          reserved.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link href="#" target="_blank" className="hover:text-white">
            Facebook
          </Link>
          <Link
            href="https://wa.me/2347064369964"
            target="_blank"
            className="hover:text-white"
          >
            WhatsApp
          </Link>
          <Link
            href="mailto:emmaculatecollege@gmail.com"
            className="hover:text-white"
          >
            Email
          </Link>
        </div>
      </div>
    </footer>
  );
}
