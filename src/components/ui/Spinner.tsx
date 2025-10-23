type Props = {
  size?: number;
  className?: string;
  stroke?: string;
};

export default function Spinner({
  size = 20,
  className = "",
  stroke = "currentColor",
}: Props) {
  return (
    <svg
      role="status"
      aria-label="loading"
      className={`animate-spin ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={stroke}
        strokeOpacity="0.25"
        strokeWidth="4"
      />
      <path
        d="M22 12a10 10 0 00-10-10"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
