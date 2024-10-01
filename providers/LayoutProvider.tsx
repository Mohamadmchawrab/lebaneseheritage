"use client";

import { usePathname } from "next/navigation";
import { fetchUsers } from "@/app/(auth)/actions/fetchUsers";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPublicRoute = ["sign-in", "sign-up"].includes(
    pathname.split("/")[1]
  );

  const getNavbar = () => {
    if (isPublicRoute) return null;
    return <Navbar />;
  };

  const getFooter = () => {
    if (isPublicRoute) return null;
    return <Footer />;
  };

  const getContent = () => {
    if (isPublicRoute) return null;
    return <>{children}</>;
  };

  const getCurrentUser = async () => {
    try {
      const response: any = await fetchUsers();
      if (response.error)
        throw new Error(response.error.message);
    } catch (error) {
      console.log(error);
    } finally {
      return;
    }
  };

  useEffect(() => {
    if (!isPublicRoute) getCurrentUser();
  }, []);

  const images = [
    "/images/leb1.jpg",
    "/images/leb3.jpg",
    "/images/leb2.jpg",
    "/images/leb4.jpg",
    "/images/leb5.jpg",
    "/images/leb6.jpg"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    // Function to update the image index
    const updateImageIndex = () => {
      setFadeIn(false); // Trigger fade-out
      setTimeout(() => {
        setCurrentImageIndex(nextImageIndex);
        setNextImageIndex((nextImageIndex + 1) % images.length); // Calculate next image index
        setFadeIn(true);
      }, 1000);
    };

    const intervalId = setInterval(updateImageIndex, 5000);

    return () => clearInterval(intervalId);
  }, [nextImageIndex, images.length]);

  return (
    <div className="min-h-screen bg-black flex flex-col justify-between relative overflow-hidden">
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
          fadeIn ? "opacity-0" : "opacity-100"
        }`}
        style={{
          backgroundImage: `url(${images[nextImageIndex]})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div className="relative z-10">
        {getNavbar()}
        {getContent()}
        {getFooter()}
      </div>
    </div>
  );
}

export default LayoutProvider;
