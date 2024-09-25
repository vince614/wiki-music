export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="container flex flex-col items-center justify-center w-full">
      {children}
    </section>
  );
}
