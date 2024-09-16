interface AvatarIconProps {
  className?: string;
}

export const AvatarIcon = ({ className }: AvatarIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 17 17"
      fill="none"
      className={className}
    >
      <path
        fill="var(--color-gray-500)"
        fillRule="evenodd"
        d="M8.467.53a4.243 4.243 0 0 0-4.235 4.234 4.241 4.241 0 0 0 4.235 4.232 4.24 4.24 0 0 0 4.232-4.232c0-2.332-1.9-4.235-4.232-4.235ZM5.09 8.823C2.812 9.88 1.088 11.941.646 14.553a1.599 1.599 0 0 0 1.567 1.851h12.514c.972 0 1.726-.893 1.564-1.851-.442-2.613-2.167-4.674-4.448-5.729a5.259 5.259 0 0 1-3.376 1.23 5.259 5.259 0 0 1-3.376-1.23Z"
        clipRule="evenodd"
      />
    </svg>
  );
};
