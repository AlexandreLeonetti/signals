import React, { useState, useEffect } from "react";
import Ranked from "./Ranked";

const Rank = ({ rankElts, what }) => {
	const [values, setValues] = useState(null);
	useEffect(() => {
		let someElts = JSON.parse(JSON.stringify(rankElts));

		console.log("in Rank", what);
        
		let sortedRank = someElts.sort((a, b) => {
            return b[what] - a[what];
        });

		setValues(sortedRank);
		console.log(someElts);
	}, []);

	return (
		<div className="bg-[#303032] rounded-md p-2">
			{values &&
				values.map((x, index) => (
					<Ranked
						key={index}
						v={x.symbol}
						p={x[what]}
					/>
				))}
		</div>
	);
};

export default Rank;
