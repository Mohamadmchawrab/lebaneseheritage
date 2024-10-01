import StatCard from "@/components/StatCard";
import { fetchUsers } from "../(auth)/actions/fetchUsers";

const page = async () => {
  const currentUser = await fetchUsers();
  return (
    <div className="relative py-20">
      {/* Faded Background Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10">
        <div className="text-center mb-10 text-2xl uppercase text-white">
          <h1>{currentUser?.data?.user.username} Stats 📊</h1>
        </div>
        <div className="max-w-[1500px] mx-auto w-[90%] grid sm:grid-cols-3 gap-10 justify-center">
          <StatCard
            title="Total Points"
            value={currentUser?.data?.quizResults[0]?.quizScore}
          />
          <StatCard
            title="Correct Answers"
            value={currentUser?.data?.quizResults[0]?.correctAnswers}
          />
          <StatCard
            title="Wrong Answers"
            value={currentUser?.data?.quizResults[0]?.wrongAnswers}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
