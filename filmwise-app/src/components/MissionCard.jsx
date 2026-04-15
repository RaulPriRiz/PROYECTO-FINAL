import ProgressBar from "./ProgressBar";

function MissionCard({ title, icon, percent, progress }) {
    return (
        <div className="relative bg-[#252525] rounded-2xl p-4 md:p-6 w-full md:w-[530px] min-h-28 md:min-h-32 flex flex-col gap-4">

            <img
                src={icon}
                alt="icon"
                className="w-14 h-14 md:w-20 md:h-20 object-contain absolute -top-4 -left-3 md:-top-6 md:-left-8"
            />

            <div className="pl-10 md:pl-13 flex flex-col gap-5">
                <p className="text-base md:text-xl">
                    {title}
                </p>

                <div className="pr-2 md:pr-4 mb-1 md:mb-2">
                    <ProgressBar percent={percent} progress={progress} />
                </div>
            </div>

        </div>
    );
}

export default MissionCard;