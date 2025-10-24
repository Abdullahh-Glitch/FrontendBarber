import { useEffect, useRef, useState } from "react";

export default function DropdownResponsive({
  label = "Select",
  items = [],
  onSelect = () => {},
  buttonClass = "",
}) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef(null);

  // Detect mobile breakpoint (below Tailwind's "sm" = 640px)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close dropdown on outside click or Esc
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // Normalize items (allow both string and object)
  const normalized = items.map((it, i) =>
    typeof it === "string" ? { id: i, name: it, value: it } : { id: i, ...it }
  );

  const handleSelect = (item) => {
    onSelect(item);
    setOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block text-left justify-end w-full"
    >
      {/* Dropdown button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`inline-flex items-center justify-center w-full py-2 mt-4 text-sm font-medium rounded-md shadow-md transition ${
          buttonClass ||
          "bg-white border border-gray-300 text-gray-700 hover:bg-green-50"
        }`}
      >
        {label}
      </button>

      {/* Desktop dropdown */}
      {!isMobile && open && (
        <div className="absolute right-0 z-30 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="py-1">
            {normalized.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile bottom sheet */}
      {isMobile && open && (
        <div className="fixed inset-0 z-40 flex items-end">
          {/* Background overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          ></div>

          {/* Sheet content */}
          <div className="relative w-full max-h-[60vh] bg-white rounded-t-lg shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <span className="text-sm font-medium text-gray-800">{label}</span>
              <button
                onClick={() => setOpen(false)}
                className="px-2 py-1 text-gray-600 rounded hover:bg-gray-100"
              >
                ✕
              </button>
            </div>
            <div className="divide-y">
              {normalized.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="block w-full text-left px-4 py-4 text-base text-gray-700 hover:bg-gray-50"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
