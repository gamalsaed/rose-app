import React from 'react';

type layoutType = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  summary: React.ReactNode;
};

export default function Layout({ children, sidebar, summary }: layoutType) {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:flex-row">
          <main className="flex-1 order-2 lg:order-1 p-4 md:p-6 lg:p-8">
            {children}
          </main>

          {/* Sidebar */}
          <aside className="order-1 lg:order-2 w-full lg:w-80 xl:w-96 lg:sticky lg:top-0 lg:h-screen overflow-y-auto  p-4 md:p-6">
            {summary}
          </aside>
        </div>

        {/* Footerbar */}
        <footer className="order-3 py-8 px-4 md:px-6 lg:px-8 ">
          {sidebar}
        </footer>
      </div>
    </>
  );
}
