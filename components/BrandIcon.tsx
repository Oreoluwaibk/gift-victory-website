const PURPLE = "#4a148c";

const heartPath =
  "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z";

type BrandIconProps = {
  size?: number;
  className?: string;
};

/** Purple circle with white heart — matches the site header logo mark */
export function BrandIcon({ size = 36, className = "" }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="16" fill={PURPLE} />
      <g transform="translate(4 3.5)">
        <path d={heartPath} fill="#ffffff" />
      </g>
    </svg>
  );
}
