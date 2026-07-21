export default function UCButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex h-8 w-fit cursor-pointer items-center justify-center gap-x-1.5 rounded-[10px] border border-uc-line bg-uc-bg px-2.5 text-xs font-medium text-nowrap text-[#edeff3] transition-colors duration-300 ease-in-out hover:border-[#3D477A] hover:bg-uc-surface hover:duration-50 ${className}`}
    >
      <span>{children}</span>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.1"
          d="M2.25 7h9.5m0 0L8.357 3.5M11.75 7l-3.393 3.5"
        />
      </svg>
    </a>
  );
}
