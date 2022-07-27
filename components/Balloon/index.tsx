import Add from './Add';
import Balloon from './Balloon';
import React, { useEffect, useState } from 'react';
import { ComponentContext } from './context';

interface BalloonComponent {
	data: Array<{
		id: string;
		content: string;
	}>;
	gap?: number;
	startYpos?: number;
}

export default function BalloonComponent({ data, gap = 50, startYpos = 0 }: BalloonComponent) {
	const [ dragging, setDragging ] = useState(false);
	const [ balloons, setBalloons ] = useState<
		Array<{
			id: string;
			content: string;
		}>
	>([]);
	const [ addText, setAddText ] = useState({ x: 0, y: 0, content: '' });
	console.log('BalloonComponent');
	useEffect(
		() => {
			if (data.length > 0) {
				setBalloons(data);
			}
		},
		[ data ]
	);
	return (
		<ComponentContext.Provider value={{ addText, setAddText, balloons, setBalloons, dragging, setDragging }}>
			<Add />
			{balloons.map((d) => <Balloon key={d.id} content={d.content} gap={gap} startYpos={startYpos} />)}
		</ComponentContext.Provider>
	);
}
