import HomePage from "@/components/homepage";
import DailyPage from "@/components/dailypage";
import HourlyPage from "@/components/hourlypage";
import { WeatherProvider } from "@/contexts/WeatherContext";

export const page = () => {
  return (
    <div className="flex justify-center items-center w-full h-full bg-gray-100">
      <WeatherProvider latitude={37.566} longitude={126.978}>
        <div
          style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
          className="
          snap-x snap-mandatory
          overflow-x-scroll
          flex
          w-screen
         h-full
          scrollbar-hide
          bg-white
          shadow-xl
        "
        >
          <div className="snap-start flex-none w-screen h-full">
            <HomePage />
          </div>

          <div className="snap-start flex-none w-screen h-full">
            <DailyPage />
          </div>

          <div className="snap-start flex-none w-screen h-full">
            <HourlyPage />
          </div>
        </div>
      </WeatherProvider>
    </div>
  );
};
export default page;
