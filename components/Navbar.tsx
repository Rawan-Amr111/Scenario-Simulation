"use client";
import { buttonStyle } from "@/constants";
import { ChartNoAxesCombined } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const navItems = [
  { label: "Simulator", href: "/" },
  { label: "Saved Scenarios", href: "saved-scenario" },
  { label: "Compare", href: "compare" },
];

const activeStyle =
  " bg-linear-to-r from-indigo-500 to-purple-500 text-white shadow";
const Navbar = () => {
  const pathname = usePathname();
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === `/${href}`;
  };
  return (
    <nav className="w-full px-6 py-6 sticky top-0 bg-white z-50 shadow-sm border-b border-gray-200">
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-500 shadow-md">
            <ChartNoAxesCombined className="text-white" size={22} />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">QueueLab</h2>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 bg-gray-200 rounded-full p-1 flex items-center gap-3 shadow-inner">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href}>
              <button
                className={
                  buttonStyle + (isActive(item.href) ? activeStyle : " ")
                }
              >
                {item.label}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
