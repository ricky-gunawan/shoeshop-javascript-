import { useState } from "react";

const menuOpen = (
  <div className="w-4 py-1 m-2">
    <div className="-translate-y-full border-t-4"></div>
    <div className="border-t-4"></div>
    <div className="translate-y-full border-t-4"></div>
  </div>
);
const menuClose = (
  <div className="w-4 py-1 m-2">
    <div className="translate-y-1/2 rotate-45 border-t-4"></div>
    <div className="-translate-y-1/2 -rotate-45 border-t-4"></div>
  </div>
);

export default function Filters() {
  const [filters, setFilters] = useState(false);

  return (
    <div>
      <div className={`fixed mt-20 rounded-r-lg top-0 w-48 bg-black/50 transition-transform duration-500 lg:translate-x-0 ${filters ? "" : "-translate-x-full"} z-20 border-r-4 border-cyan-400 lg:bg-slate-300`}>
        <button onClick={() => (filters ? setFilters(false) : setFilters(true))} className="absolute right-0 top-0 mt-2 -mr-2 translate-x-full rounded-md lg:hidden bg-cyan-400/50 text-neutral-50/50">
          {filters ? menuClose : menuOpen}
        </button>
        <div>Filters</div>
      </div>
    </div>
  );
}
