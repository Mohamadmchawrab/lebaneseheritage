const StatCard = ({
  title,
  value,
}: {
  title: string;
  value: string | number | undefined;
}) => {
  return (
    <div className="p-5 rounded-lg text-white text-center transition-transform duration-300 transform hover:scale-105 shadow-lg bg-gradient-to-r from-pink-500 to-red-500">
      <h3 className="uppercase text-lg font-semibold mb-2">{title}</h3>
      <span className="text-3xl font-bold">{value}</span>
    </div>
  );
};

export default StatCard;
