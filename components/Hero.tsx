import Link from "next/link";

interface SupportCardProps {
  hasTakenQuiz: boolean;
}

const Hero: React.FC<SupportCardProps> = ({ hasTakenQuiz }) => {
  return (
    <section
      className="relative w-full min-h-[500px] flex items-center justify-center text-center bg-cover bg-center bg-no-repeat mb-8" // Added margin-bottom here
      style={{ backgroundImage: 'url("/path-to-your-background-image.jpg")' }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative px-4 md:px-6 max-w-[1500px] mx-auto w-[90%] z-10 mb-8"> {/* Added margin-bottom here */}
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl/none text-white leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              What insights do you have about Lebanon?
            </span>
          </h1>
          <p className="text-lg md:text-xl font-bold text-gray-300 drop-shadow-lg">
            {hasTakenQuiz
              ? "You've already taken the quiz! Wait for the next week Quiz to increase your score"
              : "Gear up to nail it, and secure the top spot in the ranking."}
          </p>
        </div>
        <div className="mt-8">
          {!hasTakenQuiz ? (
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-red-500 px-8 py-4 text-sm md:text-base font-medium text-gray-50 shadow-lg transition-transform duration-300 hover:scale-105"
            >
              I'm ready
            </Link>
          ) : (
            <span className="inline-flex items-center justify-center rounded-full bg-gray-500 px-8 py-4 text-sm md:text-base font-medium text-gray-50 shadow-lg">
              You've already taken the quiz!
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
