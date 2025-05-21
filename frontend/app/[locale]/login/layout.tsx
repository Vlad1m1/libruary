export default function AuthorizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div>
        {children}
      </div>
    </section>
  );
}