import Header, { View } from '@/components/header';
import MainSidebar from '@/components/main-sidebar';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <MainSidebar />
      </div>
      <div className="flex flex-col">
        {/* The Header now needs props passed from child pages, so we remove it from the general layout */}
        {/* <Header /> */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40 pb-20 md:pb-6">
          {children}
        </main>
      </div>
    </div>
  );
}
