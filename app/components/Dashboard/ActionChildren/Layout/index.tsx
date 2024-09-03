'use client'
import Image from "next/image";
import './index.css'
import { FiImage } from "react-icons/fi";
import { useCallback, useState } from "react";
import { Api } from "../../../../../utils/apis";

export default function Layout({linkid,currLayout} : {linkid: string, currLayout: string}) {
    const [selectedLayout, setSelectedLayout] = useState<string>("CLASSIC");

    const handleLayoutChangeRequest = useCallback(async(layout : "CLASSIC" | "CUSTOM")=>{
        const req = await Api.updateLink(linkid, {layout : layout});
        console.log(req);
    },[selectedLayout])

    const handleLayoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const layout = e.target.value as "CLASSIC" | "CUSTOM";
        setSelectedLayout(layout);
        handleLayoutChangeRequest(layout);
    }

    return (
        <div className="w-full px-4 py-6">
            <fieldset className="flex flex-col items-start">
                <legend className="text-slate-500">Choose a layout for your link</legend>
                <form className="flex flex-col gap-4 mt-2">
                    <label className="group relative min-h-[36px] p-md w-full border-[1px] rounded-2xl p-4 flex justify-center gap-2 items-center transition-all duration-75 ease-in text-sm cursor-pointer hover:border-slate-500">
                        <input
                            value="CLASSIC"
                            type="radio"
                            name="layout"
                            className="opacity-0"
                            defaultChecked={currLayout === 'CLASSIC'}
                            checked={selectedLayout === 'CLASSIC'}
                            onChange={handleLayoutChange}

                        />
                        <div className="w-full flex justify-between">
                            <div className="flex flex-col justify-center my-md w-[50%]">
                                <p className="font-semibold">Classic</p>
                                <p className="text-slate-700">Efficient, direct, and compact</p>
                            </div>
                            <div className="flex flex-col justify-center items-center w-[170px]">
                                <Image
                                    alt="classic-link"
                                    src="/assets/classic-link.webp"
                                    width={170}
                                    height={96}
                                />
                            </div>
                        </div>
                    </label>

                    <label className="group relative min-h-[36px] p-md w-full border-[1px] rounded-2xl p-4 flex justify-center gap-2 items-center transition duration-75 ease-out text-sm cursor-pointer hover:border-slate-500 group-checked:border-2">
                        <input
                            value="CUSTOM"
                            type="radio"
                            name="layout"
                            className="absolute opacity-0 peer"
                            defaultChecked={currLayout === 'CUSTOM'}
                            checked={selectedLayout === 'CUSTOM'}
                            onChange={handleLayoutChange}
                        />
                        <div className="w-full flex justify-between">
                            <div className="flex flex-col justify-center my-md w-[50%] gap-2">
                                <p className="font-semibold">Featured</p>
                                <p className="text-slate-700">
                                    Make your link stand out with more attractive displays
                                </p>
                                <button type="button" className="flex items-center justify-center w-full px-2 py-3 gap-2 rounded-full border-[1px] border-slate-500 hover:border-slate-700 active:border-slate-900">
                                    <FiImage className="text-slate-500 text-xl" />
                                    <span className="font-semibold text-md">Add thumbnail</span>
                                </button>
                            </div>
                            <div className="flex flex-col justify-center w-[170px]">
                                <Image
                                    alt="featured-link"
                                    src="/assets/featured-link.webp"
                                    width={170}
                                    height={96}
                                />
                            </div>
                        </div>
                    </label>
                </form>
            </fieldset>
        </div>
    );
}
