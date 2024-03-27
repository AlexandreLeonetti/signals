import React from "react";
import Rank from "./Rank";

const TopElement = ({ranking, what, key}) => {
    return (
        <div className="p-2 bg-[#454547] rounded-lg">
                <Rank key={key} what={what} rankElts= {ranking}/>
        </div>
    )
}

export default TopElement;