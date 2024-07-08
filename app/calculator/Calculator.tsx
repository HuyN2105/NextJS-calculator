'use client';

import { useState } from 'react';

function Calculator() {
	const [Num, UpdateNum] = useState(0);

	function ChangeNum(NewNumber: number) {
		UpdateNum(NewNumber);
	}

	return (
		<>
			<div className='w-[45vw] h-[93vh] bg-black fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-[35px]'>
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#a5a5a5] fixed top-[35vh] left-[4%] text-black'
					onClick={() => UpdateNum(0)}
				>
					AC
				</button>
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#a5a5a5] fixed top-[35vh] left-[28%] text-black'
					onClick={() => UpdateNum(0)}
				>
					<div className='absolute text-[20px] top-1/2 left-1/2 -translate-x-[135%] -translate-y-[75%]'>
						+
					</div>
					<div className='absolute text-[35px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12'>
						/
					</div>
					<div className='absolute text-[25px] top-1/2 left-1/2 translate-x-[40%] -translate-y-[57.5%] font-extrabold'>
						_
					</div>
				</button>
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#a5a5a5] fixed top-[35vh] left-[52%] text-black'
					onClick={() => UpdateNum(0)}
				>
					%
				</button>
			</div>
		</>
	);
}

export default Calculator;
