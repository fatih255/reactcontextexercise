import Link from 'next/link';
import React from 'react';
import styles from './Navbar.module.sass';

export default function Navbar() {
	return (
		<nav className={styles.navbar}>
			<Link href="/home">
				<a>Home</a>
			</Link>
			<Link href="/balloon">
				<a>Balloon</a>
			</Link>
		</nav>
	);
}
