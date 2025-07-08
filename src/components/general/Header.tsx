"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { IoMenu } from "react-icons/io5";
import { useUserStore } from "@/stores/useUserStore";

function signout() {
  useUserStore.getState().clearUser();
  window.location.href = "/signin";
}

const Header = () => {
  const user = useUserStore((state) => state.user);
  const [showBg, setShowBg] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 768) {
        setShowBg(window.scrollY > 30);
      } else {
        setShowBg(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Closes the mobile menu on nav item click
  const handleMenuClick = () => {
    if (window.innerWidth < 768) {
      setMenu(false);
    }
  };

  return (
    <div
      className={`no-print md:fixed z-50 w-screen p-5 text-transparent  md:px-20 md:h-24 h-20 flex items-center transition-all duration-700 ${
        showBg ? "bg-white shadow-lg" : ""
      }`}
    >
      <Image
        src="/images/logo.png"
        alt="Emmaculate Logo"
        width={50}
        height={50}
        className="mr-4 h-16 w-16 rounded-full"
      />
      <h1 className=" md:text-lg font-poppins font-bold text-head flex-1">
        De Emmaculate College
      </h1>

      <div className="flex items-center mr-5 text-lg md:hidden">
        <button onClick={() => setMenu(!menu)} className="text-2xl text-cta">
          <IoMenu />
        </button>
      </div>

      <div className="w-40% hidden md:block">
        <HeaderLink link="/" text="Home" onClick={handleMenuClick} />
        <HeaderLink link="/about" text="About" onClick={handleMenuClick} />
        {user?.email ? (
          <HeaderLink
            link="/signout"
            text="signout"
            onClick={handleMenuClick}
          />
        ) : (
          <HeaderLink link="/signin" text="signin" onClick={handleMenuClick} />
        )}
        <HeaderLink
          link="/support"
          text="contact us"
          onClick={handleMenuClick}
        />
      </div>

      <div
        className={`md:hidden z-[99] absolute top-20 left-0 w-full bg-white shadow-lg overflow-hidden transition-all duration-300 ${
          menu ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <HeaderLink link="/" text="Home" onClick={handleMenuClick} />
        <HeaderLink link="/about" text="About" onClick={handleMenuClick} />
        {user?.email ? (
          <HeaderLink
            link="/signout"
            text="signout"
            onClick={handleMenuClick}
          />
        ) : (
          <HeaderLink link="/signin" text="signin" onClick={handleMenuClick} />
        )}
        <HeaderLink
          link="/support"
          text="contact us"
          onClick={handleMenuClick}
        />
      </div>
    </div>
  );
};

function HeaderLink({
  link,
  text,
  onClick,
}: {
  link: string;
  text: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <Link
      href={link}
      onClick={(e) => {
        if (link === "/signout") {
          e.preventDefault();
          signout();
        }
        onClick?.(); // Close menu if needed
      }}
      className={`block md:inline-block z-50 text-md p-3 m-2 text-cta hover:bg-[#e0fbfc] rounded-lg ${
        isActive ? "bg-[#e0fbfc]" : ""
      }`}
    >
      {text}
    </Link>
  );
}

export default Header;
