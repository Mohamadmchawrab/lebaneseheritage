import SupportCard from "@/components/SupportCard";

const SupportPage = () => (
  <div className="relative py-20">
    {/* Faded Background Overlay */}
    <div className="absolute inset-0 bg-black/60 z-0"></div>

    <div className="relative z-10 rounded-lg overflow-hidden flex flex-col items-center p-5 m-2">
      <h1 className="text-3xl font-bold text-white mb-8">
        Reliable Support for the Ongoing LB Crisis
      </h1>
      <div className="flex flex-wrap justify-center max-w-[1200px] gap-6">
        <SupportCard
          name={"Whish Money"} 
          img={"/support/whish.jpeg"}
          type={"whish"}
          // link={"/support/whish-bar-code.jpeg"} // Update with your barcode image path
        />
        <SupportCard 
          name={"International Visa"} 
          img={"/support/visa.jpeg"} 
          type={"card"} 
        />
      </div>
      <p className="mt-8 text-lg text-white text-center px-4 max-w-[800px]">
        Your donations are trusted and will be directed to support Lebanon and the refugees from the south 
        who are currently staying in schools. They are in urgent need of food, sleeping mats, and other essential supplies. 
        Every contribution makes a difference in their lives and helps provide the necessary assistance during this critical time.
      </p>
    </div>
  </div>
);

export default SupportPage;
