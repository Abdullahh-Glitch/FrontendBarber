import { Scissors } from "lucide-react";

const Loader = ({
  size = 48,          // px
  color = "text-gray-900",
  fullScreen = false,
  text = "Loading...",
}) => {
  const loader = (
    <div className="flex flex-col items-center justify-center gap-3">
      <Scissors
        size={size}
        className={`${color} animate-spin`}
        strokeWidth={2.2}
      />
      {text && (
        <span className="text-sm font-medium tracking-wide text-gray-600">
          {text}
        </span>
      )}
    </div>
  );

  if (!fullScreen) return loader;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      {loader}
    </div>
  );
};

export default Loader;
