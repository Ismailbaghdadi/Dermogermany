export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3 sm:px-6">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-navy to-turquoise text-sm font-extrabold text-white">
          DG
        </span>
        <div className="flex flex-col leading-tight">
          <span className="text-base font-bold text-navy sm:text-lg">
            Centre Dermogermany
          </span>
          <span className="text-xs text-muted">عين السبع، الدار البيضاء</span>
        </div>
      </div>
    </header>
  );
}
