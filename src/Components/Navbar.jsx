import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ btns }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-black text-white sticky top-0 z-50 shadow-lg">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Barbershop Logo" className="w-10 h-10" />
          <span className="text-xl font-semibold tracking-wide">
            Barbershop
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-sm font-medium">
          {btns.map((btn, index) => (
            <li key={index}>
              <Link
                to={btn.page}
                className="hover:text-yellow-400 duration-200 cursor-pointer"
              >
                {btn.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setOpen(!open)}
        >
          <span
            className={`w-6 h-0.5 bg-white ${
              open ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span className={`w-6 h-0.5 bg-white ${open ? "opacity-0" : ""}`} />
          <span
            className={`w-6 h-0.5 bg-white ${
              open ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="md:hidden flex flex-col gap-4 bg-black px-6 py-4">
          {btns.map((btn, index) => (
            <li key={index}>
              <Link
                to={btn.page}
                onClick={() => setOpen(false)}
                className="hover:text-yellow-400 duration-200"
              >
                {btn.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
