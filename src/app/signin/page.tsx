import { SignupFormDemo } from "@/src/components/signup/Form";
import Image from "next/image";

export default function Signin() {
  return (
    <div className="md:min-h-screen my-10 md:my-0 md:flex">
      <div className="hidden flex-1 md:flex items-center justify-center">
        <Image
          src="/images/logo.png"
          alt="Emmaculate college"
          width={500}
          height={500}
        />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <SignupFormDemo />
      </div>
    </div>
  );
}
