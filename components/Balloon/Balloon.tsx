import React, { useRef, useEffect, useContext } from 'react';
import styles from './Balloon.module.sass';
import classNames from 'classnames/bind';
import { DragElement } from './utils';
import { useBalloonContext } from './context';

export default React.memo(Balloon);

let stackheight = 0;
let stackwidth = 0;
let counter = 0;
let col = 0;
function Balloon({
	content = '',
	mode = 'show',
	order = 0,
	gap = 0,
	startYpos = 0
}: {
	content?: string;
	mode?: 'show' | 'edit';
	order?: number;
	gap?: number;
	haveOrder?: boolean;
	startYpos?: number;
}) {
	const RanEffect = useRef(false);

	var cx = classNames.bind(styles);

	const BalloonRef = useRef<HTMLDivElement>(null);

	const { dragging, setDragging, setAddText,addText } = useBalloonContext();
	console.log('Balloon');

	useEffect((): any => {
		if (RanEffect.current === false) {
			if (mode === 'show' && BalloonRef.current) {
				DragElement(BalloonRef, setDragging);
				if(addText.x){
					console.log(addText.x)
					BalloonRef.current.style.top = addText.y + 'px';
					BalloonRef.current.style.left = addText.x + 'px';
					return
				}
				const { width, height } = BalloonRef.current.getBoundingClientRect();
				
				counter += 1;
				if (counter === 1) {
					stackwidth += gap;
					BalloonRef.current.style.top = startYpos + 'px';
					stackheight += startYpos + height + gap;
					BalloonRef.current.style.left = stackwidth + 'px';
				} else {
					if (stackheight > globalThis.outerHeight) {
						col++;
						stackheight = startYpos;
						stackwidth += width + gap;
					}
					let leftspace = col === 0 ? gap : stackwidth;
					BalloonRef.current.style.top = stackheight + 'px';
					BalloonRef.current.style.left = stackwidth + 'px';
					stackheight += height + gap;
				}
			}
		}
		return () => {
			RanEffect.current = true;
		};
	}, []);

	return (
		<div ref={BalloonRef} className={cx('container', { edit: mode === 'edit' }, { show: mode === 'show' })}>
			{mode === 'show' && content}
			{SpanForAdd(mode, setAddText)}
		</div>
	);
}

const SpanForAdd = (mode: 'show' | 'edit', setAddText: React.Dispatch<React.SetStateAction<{x:number,y:number,content:string}>>) => {
	const contentRef = useRef<any>();
	let rectx=0,recty=0
	if(contentRef.current){
		 const {x,y} =contentRef.current.getBoundingClientRect();
		 rectx=x
		 recty=y
		
	}

	return (
		mode==='edit'? <span
		onKeyUp={() => setAddText({x:rectx,y:recty,content: contentRef.current.innerHTML})}
		role="textbox"
		ref={contentRef}
		contentEditable
	/>:
	<></>
	);
};
