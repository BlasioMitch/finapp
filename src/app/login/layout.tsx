export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C39BB]/5 via-white to-[#1C39BB]/10">
      <div className="container mx-auto px-4">
        {children}
      </div>
    </div>
  );
} 