import React from "react";


const Ranked = ({v, p }) => {
    const colorClass = p>0? "text-green-500" : "text-red-500";

    return (
        <div className = " flex text-sm bg-[#303032] hover:bg-black p-1 px-2 items-center">
            <div  className="flex-1">

           {v} 
            </div>
            <div className={`${colorClass}`}>
                {p} %
            </div>
        </div>
    )

}


export default Ranked;
