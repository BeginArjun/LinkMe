import { FiChevronDown, FiSearch } from "react-icons/fi";
import { formatDate } from "./utils/formatDate";
import { TIMEZONES } from "./utils/constants";

export default function Schedule() {
    return (
        <div className="flex flex-col justify-between items-start px-3 py-5 w-full h-full relative">
            <div>
                <h3 className="text-black font-medium text-md">Schedule</h3>
                <p className="text-slate-500 font-light text-sm">Choose a date and time in future for your link to activate</p>
            </div>
            <form className="w-full flex flex-col justify-between items-start gap-4 py-4 min-h-fit lg:mb-6">
                <div className="flex justify-between items-center w-full gap-4">
                    <label className="w-1/2 flex flex-col gap-2">
                        <legend className="font-medium text-sm text-black after:content-['*'] after:ml-0.5 after:text-red-500">Start on</legend>
                        <input type="datetime-local" className="bg-slate-200 px-2 py-3 font-light text-base rounded-lg focus:outline-none cursor-pointer hover:bg-slate-300"
                        defaultValue={formatDate(new Date())}
                        required
                        />
                    </label>
                    <label className="w-1/2 flex flex-col gap-2">
                        <legend className="font-medium text-sm text-black">End on (optional) </legend>
                        <input type="datetime-local" className="bg-slate-200 px-2 py-3 font-light text-base rounded-lg focus:outline-none cursor-pointer hover:bg-slate-300" />
                    </label>
                </div>
                <label className="w-full" htmlFor="timezone">
                    <legend className="font-medium text-sm text-black">Timezone</legend>
                    <p className="text-slate-500 font-light text-xs">Choose the timezone for your schedule</p>
                </label>
                <div className="flex justify-between items-center w-full bg-slate-200 hover:bg-slate-300 cursor-pointer px-3 py-3 rounded-xl">
                    <FiSearch/>
                    <input autoComplete="on" type="text" list="timezone" 
                    className="bg-transparent w-full text-center focus:outline-none" placeholder="Search timezone"/>
                    <datalist
                    id="timezone" 
                    className="bg-white absolute bottom-0 border max-h-36 overflow-y-auto items-start">
                        {
                            TIMEZONES.map((timezone, index) => (
                                <option key={index} value={timezone}
                                className="bg-transparent text-black font-light text-sm"
                                >{timezone}</option>
                            ))
                        }
                    </datalist>
                </div>
                <button type="submit" className="absolute bottom-0 right-0  bg-[--brand-primary] w-40 hover:bg-pink-500 active:shadow-none border-[1px] border-black shadow-[2px_2px_0_0_#000]  px-2 py-3 rounded-full font-semibold text-white">Save</button>
            </form>
        </div>
    )
}