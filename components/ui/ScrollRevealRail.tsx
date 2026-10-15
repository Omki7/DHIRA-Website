interface Props {
  children: React.ReactNode;
  className?: string;
}

/* The centred 1440px column every section sits in, with the site's side
   gutters. It used to draw a hairline and a gold scroll trail down both
   edges; those were removed on every page on 15 Oct 2026 (user), so the
   column is now invisible and only sets width and padding. */
export default function ScrollRevealRail({ children, className = "" }: Props) {
  return (
    <div className={`relative mx-auto w-full max-w-[1440px] ${className}`}>
      <div className="px-4 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}
