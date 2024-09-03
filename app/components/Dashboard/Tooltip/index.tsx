import React from "react";

export default function Tooltip({ title, children } : {title : string, children : React.ReactNode}) {
    return (
        <div className="relative flex items-center group">
            {children}
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 flex flex-col items-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {/* Tooltip box */}
                <div className="bg-slate-700 text-white text-xs rounded py-1 px-2 shadow-lg relative">
                    {title}
                    {/* Caret shape */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-slate-700"></div>
                </div>
            </div>
        </div>
    );
}
