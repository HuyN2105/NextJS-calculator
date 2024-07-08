'use client';

import { useState } from 'react';
import Calculator from './calculator/Calculator';

function Home() {
	return (
		<>
			<div className='w-screen h-screen items-center'>
				<Calculator></Calculator>
			</div>
		</>
	);
}

export default Home;
