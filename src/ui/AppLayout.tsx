import { Outlet } from "react-router-dom";
import Header from "./Header";
import SiderBar from "./SiderBar";
import RightBar from "./RightBar";

export default function AppLayout() {
  return (
    <div
      className={`sm:flex max-w-[1920px] w-full h-screen  transition-all duration-150`}
    >
      <div className={`sm:flex w-full `}>
        <header
          className={`fixed top-0 w-full z-50 md:hidden shadow-inner p-2 col-span-3 bg-stone-200`}
        >
          <Header />
        </header>
        <aside
          className={`sticky hidden md:flex top-0 h-screen max-w-[260px] w-full  shadow-2xl p-4`}
        >
          <SiderBar />
        </aside>
        <main
          className={`col-span-2 py-28 m-auto max-w-[2200px] w-full h-full p-8 sm:py-28 md:py-8 overflow-y-auto`}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <Outlet />
        </main>
        <aside
          className={`sticky hidden lg:flex top-0 h-screen max-w-[230px] w-full  shadow-2xl p-4`}
        >
          <RightBar />
        </aside>
      </div>
    </div>
  );
}
