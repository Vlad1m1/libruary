export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="items-center">
			{children}
		</section>
  );
}
