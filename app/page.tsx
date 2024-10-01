import Hero from "@/components/Hero";
import { fetchUsers } from "./(auth)/actions/fetchUsers";

const Home = async () => {

  const currentUser = await fetchUsers();
  let hasTakenQuiz : any = currentUser?.data?.quizResults[0]?.quizScore

  return (
    <>
      <Hero hasTakenQuiz={hasTakenQuiz} />
    </>
  );
};

export default Home;
