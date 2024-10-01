import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-10">
      <div className="text-center text-white mb-4">
        <Link href="/support-lebanon" className="font-bold text-lg">
          Support ❤️ Lebanon
        </Link>
      </div>
      <div className="max-w-[1500px] mx-auto w-[90%] text-center text-white">
        <span>
          Copyright © 2024 - All rights reserved by momchawrab.info
        </span>
      </div>
    </footer>
  );
};

export default Footer;
