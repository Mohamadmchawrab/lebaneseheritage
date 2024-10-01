import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { FaCrown } from "react-icons/fa";

const page = async () => {
  const users = await prisma.user.findMany({
    include: { quizResults: true },
  });

  // Sort users based on total quiz scores
  users.sort(
    (a, b) =>
      b.quizResults.reduce((acc, curr) => acc + curr.quizScore, 0) -
      a.quizResults.reduce((acc, curr) => acc + curr.quizScore, 0)
  );

  return (
    <div className="relative py-20">
      {/* Faded Background Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      {/* Main Content */}
      <div className="max-w-[1500px] mx-auto w-[90%] py-10 relative z-10">
        <h1 className="font-bold mb-4 text-center text-2xl uppercase text-white">
          Leaderboard 🏆
        </h1>
        <ol className="flex flex-col">
          {users.map((user, index) => (
            <li key={user.id} className={`py-4 ${index < 3 ? "font-bold" : ""} text-left`}>
              <div className="flex items-center gap-5 w-full">
                <div className="flex sm:flex-row flex-col gap-1 justify-between w-full items-start">
                  <div className="flex gap-3 items-center">
                    <span className="text-lg mb-1 text-white">{index + 1}</span>
                    <Image
                      src={user.profilePic}
                      width={30}
                      height={30}
                      alt={`Image of ${user.username}`}
                      className="rounded-full"
                    />
                    <span className="text-lg text-white">{user.username}</span>
                    {index === 0 && (
                      <FaCrown className="inline-block w-6 h-6 text-yellow-500 mb-1" />
                    )}
                  </div>
                  <span className="text-white">
                    Total Quiz Score:{" "}
                    {user.quizResults.reduce((acc, curr) => acc + curr.quizScore, 0)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default page;
