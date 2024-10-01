import Link from "next/link";
import { useState } from "react";
import { CgMenuGridO } from "react-icons/cg";

const UserMenu = () => {
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Stats", path: "/stats" },
    { name: "Leaderboard", path: "/leaderboards" },
    { name: "Support LB ❤️", path: "/support-lebanon" }, // New link added
  ];

  return (
    <div
      className="text-xl mt-1 cursor-pointer p-2 relative"
      onMouseEnter={() => setOpenUserMenu(true)}
      onMouseLeave={() => setOpenUserMenu(false)}
    >
      <CgMenuGridO className="text-white" />
      {openUserMenu && (
        <ul className="absolute bg-white z-[99] top-8 sm:left-[-110px] left-[-80px] p-3 rounded-md shadow-lg">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.path}
              onClick={() => setOpenUserMenu(false)}
            >
              <li className="text-black text-base py-2 hover:underline transition-all duration-200 text-left">
                {link.name}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserMenu;
