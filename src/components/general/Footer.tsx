export default function Footer() {
  return (
    <div className="p-10 bg-text text-bluebg no-print">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
        <div>
          <h5 className="font-bold font-poppins font-lg">Address</h5>
          <p>5 ibikunle street, Maidan, Mile 12, Lagos state, Nigeria</p>
        </div>
        <div>
          <h5 className="font-bold font-poppins font-lg">Contact Us</h5>
          <p>
            <span className="font-bold">Tel:</span> +23490 3507 8430
          </p>
          <p>
            <span className="font-bold">Email:</span> emmaculate@gmail.com
          </p>
        </div>
      </div>
      <p className="text-center pt-10">
        &copy; Emmaculate College {new Date().getFullYear()}
      </p>
    </div>
  );
}
