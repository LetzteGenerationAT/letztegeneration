import LandingIntro from "~/components/Authentication/LandingIntro";
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen">
      <div className="flex min-h-screen items-center bg-base-200">
        <div className="card mx-auto w-full max-w-5xl shadow-xl">
          <div className="grid grid-cols-1 rounded-xl bg-base-100 md:grid-cols-2">
            <LandingIntro />
            <div className="py-24 px-10">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
