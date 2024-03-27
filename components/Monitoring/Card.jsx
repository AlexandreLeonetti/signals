import React, { useState, useEffect } from "react";
import Item from "./Item";
//import './Card.css';

const Card = ({ data, lastPrice, avgTen, avg20, avg50, avg100 }) => {
	const colorClass = lastPrice > avgTen ? "text-green-500" : "text-red-500";
	return (
		<div className={`  box-content  card p-2 bg-[#454547] rounded-lg `}>
			{data && (
				<div className="test  ">
					<div className="pb-2 px-2 flex text-sm">
						<div className="flex-1">Symbol :</div>
						<div className={` `}>{data}</div>
					</div>
					<div
						className={`pb-8 h-40 text-white  bg-[#303032]  p-3  rounded-lg  `}
					>
						<div className="flex text-sm">
							<div className="flex-1">price:</div>
							<div className={` `}>{lastPrice}</div>
						</div>

					    <Item
                            name = "avg"
                            value= {avgTen}
                        />
                         <Item
                            name = "avg20"
                            value= {avg20}
                        />
                          <Item
                            name = "avg50"
                            value= {avg50}
                        />
                         <Item
                            name = "avg100"
                            value= {avg100}
                        />                                             
					</div>

				</div>
			)}
		</div>
	);
};

export default Card;
