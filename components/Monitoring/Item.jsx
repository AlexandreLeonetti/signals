import React from "react";


function Item ({name,value}){
    const colorClass = value>0? "text-green-500" : "text-red-500";
    const sign = value>0? "+":"";
    return (
        <>
            <div className="flex text-sm">
                    <div className="flex-1">{name}: </div>
                    <div className={` ${colorClass}`}>{`${sign}`+value+`%`}</div>
            </div>
        </>
    );
}


export default Item;
