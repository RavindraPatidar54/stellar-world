interface PlaceholderPageProps {
  title: string;
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">{title}</h1>
        <p className="text-muted-foreground mb-8">
          This page is under construction. Continue prompting to add content to this section.
        </p>
        <div className="w-16 h-16 mx-auto bg-dashboard-accent-blue rounded-lg flex items-center justify-center">
          <span className="text-white text-2xl font-bold">{title.charAt(0)}</span>
        </div>
      </div>
    </div>
  );
}
