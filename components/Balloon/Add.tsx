import { faker } from '@faker-js/faker';
import classNames from 'classnames/bind';
import React, { useEffect, useRef } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import styles from './Add.module.sass';
import Balloon from './Balloon';
import { useBalloonContext } from './context';
import { showAdd } from './utils';

export default function Add() {
	const boxRef = useRef<HTMLDivElement>(null);

	var cx = classNames.bind(styles);
	const { dragging, addText, setBalloons,setAddText } = useBalloonContext();

	useEffect(() => {
		showAdd(boxRef,setAddText,addText);
	}, []);

	console.log('add');

	const AddBalloonHandler = () => {
		setBalloons((prev: any) => [ ...prev, { id: faker.datatype.uuid(), ...addText } ]);
	};
	return (
		<div className={cx('addbaloon', { pointernone: dragging })} ref={boxRef}>
			<div className={styles.relative}>
				<Balloon mode="edit" />
				<button onClick={AddBalloonHandler} type="button" value="Add">
					<BsPlusLg color="white" size={20} />
				</button>
			</div>
		</div>
	);
}
