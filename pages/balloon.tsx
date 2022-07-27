import BalloonComponent from 'components/Balloon';
import React, { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';

export default function balloon() {
	const [ data, setData ] = useState<any>([]);

	useEffect(() => {
		setData(
			Array.from(Array(5), (x, k) => ({
				id: faker.datatype.uuid(),
				content: faker.lorem.words(23)
			}))
		);
	}, []);

	return (
		<div className="balloon ">
			{data ? <BalloonComponent gap={50} data={data} startYpos={200} /> : <div>Loading ...</div>}
		</div>
	);
}
