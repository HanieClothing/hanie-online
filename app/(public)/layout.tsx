import '../globals.css'

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className='h-dvh flex flex-col'>
        <div className="max-w-md h-full mx-auto w-full flex-1 flex flex-col gap-12 items-center justify-center">{children}</div>
      </body>
    </html>
  );
}
