import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

export function PlayPauseButton({
  onClick,
  isPlaying,
}: {
  onClick: () => void;
  isPlaying: boolean;
}) {
  return (
    <button
      className={twMerge(
        "flex h-8 w-8 items-center justify-center rounded-full shadow-md transition ease-in",
        isPlaying
          ? "bg-gray-700 hover:bg-gray-800"
          : "bg-green-500 hover:bg-green-700",
      )}
      onClick={onClick}
    >
      {isPlaying ? (
        <BsFillPauseFill className="h-6 w-6" />
      ) : (
        <BsFillPlayFill className="h-6 w-6" />
      )}
    </button>
  );
}
