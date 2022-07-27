export const showAdd = (
	boxref: React.RefObject<HTMLDivElement>,
	setAddText: React.Dispatch<React.SetStateAction<{ x: number; y: number; content: string }>>,
	addText: { x: number; y: number; content: string }
) => {
	document.onclick = (e: any) => {
		console.log(addText)
		e.preventDefault();
		boxref.current &&
			setAddText({
				...addText,
				x: e.clientX,
				y: e.clientY
			});
		var element = e.target as HTMLElement;
		if ((element.className === 'balloon' || element.tagName === 'HTML') && boxref.current) {
			boxref.current.style.top = e.clientY + 'px';
			boxref.current.style.left = e.clientX + 'px';
		}
	};
};

export const DragElement = (
	reactRef: React.RefObject<any>,
	setDragging: React.Dispatch<React.SetStateAction<boolean>>
) => {
	var pos1 = 0,
		pos2 = 0,
		pos3 = 0,
		pos4 = 0;

	reactRef.current.onmousedown = dragStart;

	function dragStart(e: any) {
		setDragging(true);

		console.log('dragging');
		e = e || window.event;
		e.preventDefault();
		e.stopPropagation();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = dragEnd;
		document.onmousemove = dragging;
		e.target.style.zIndex = 20;
	}

	function dragging(e: any) {
		console.log('dragging');
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		e.target.style.top = e.target.offsetTop - pos2 + 'px';
		e.target.style.left = e.target.offsetLeft - pos1 + 'px';
	}

	function dragEnd(e: any) {
		console.log('dragEnd');
		document.onmouseup = null;
		document.onmousemove = null;
		setDragging(false);
		e.target.style.zIndex = 10;
	}
};
