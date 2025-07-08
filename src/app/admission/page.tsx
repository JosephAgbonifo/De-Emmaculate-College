import Link from "next/link";

export default function AdmissionPage() {
  return (
    <main className="p-10 max-w-4xl mx-auto text-bluebg">
      <h1 className="text-3xl font-bold mb-6 md:pt-20">
        Admission Information
      </h1>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">📌 Admission Overview</h2>
          <p>
            Emmaculate College welcomes new students into JSS1 to SS3. We offer
            a supportive environment, top-tier academic programs, and a vibrant
            campus life that prepares your child for success.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">📅 Admission Period</h2>
          <p>
            Admission opens every academic term, with entrance exams scheduled
            ahead of resumption. Transfers are welcome based on availability and
            performance.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">📝 Requirements</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Completed previous school reports or transcripts</li>
            <li>Birth certificate or age declaration</li>
            <li>Passport photograph</li>
            <li>Successful performance in the entrance examination</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">📍 How to Apply</h2>
          <p>
            To begin the admission process, please visit our school premises or
            contact us via the channels below:
          </p>
          <ul className="list-none mt-2 space-y-1">
            <li>
              📞{" "}
              <Link href="tel:+2349035078430" className="underline">
                +234 903 507 8430
              </Link>
            </li>
            <li>
              ✉️{" "}
              <Link href="mailto:emmaculate@gmail.com" className="underline">
                emmaculate@gmail.com
              </Link>
            </li>
            <li>
              💬{" "}
              <Link href="https://wa.me/2349035078430" className="underline">
                Chat on WhatsApp
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">📎 Admission Office Hours</h2>
          <p>Monday to Friday — 9:00 AM to 3:00 PM</p>
        </div>
      </section>
    </main>
  );
}
