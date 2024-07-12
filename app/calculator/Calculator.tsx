'use client';

import { useState } from 'react';

function Calculator() {
	const [Num, UpdateNum] = useState(0);

	function ChangeNum(NewNumber: number) {
		UpdateNum(NewNumber);
	}

	return (
		<>
			<div className='w-[430px] h-[860px] rounded-md bg-black fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-[35px]'>
				{/* 1st ROW */}

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
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#ff9f0a] fixed top-[35vh] left-[76%] text-[#fffeff]'
					onClick={() => UpdateNum(0)}
				>
					<div className='w-[5px] h-[5px] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-3 bg-[#fffeff]'></div>
					<div className='w-[5px] h-[5px] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1.5 bg-[#fffeff]'></div>
					<div className='w-[28%] h-[4px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fffeff]'></div>
				</button>

				{/* 2nd ROW */}

				<button
					className='w-1/5 h-[10%] rounded-full bg-[#333333] fixed top-[46vh] left-[4%] text-white font-normal text-[40px]'
					onClick={() => UpdateNum(0)}
				>
					7
				</button>
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#333333] fixed top-[46vh] left-[28%] text-white font-normal text-[40px]'
					onClick={() => UpdateNum(0)}
				>
					8
				</button>
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#333333] fixed top-[46vh] left-[52%] text-white font-normal text-[40px]'
					onClick={() => UpdateNum(0)}
				>
					9
				</button>
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#ff9f0a] fixed top-[46vh] left-[76%] text-[#fffeff]'
					onClick={() => UpdateNum(0)}
				>
					<div className='w-[33%] h-[4px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fffeff] rotate-45'></div>
					<div className='w-[33%] h-[4px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fffeff] -rotate-45'></div>
				</button>

				{/* 3rd ROW */}

				<button
					className='w-1/5 h-[10%] rounded-full bg-[#333333] fixed top-[57vh] left-[4%] text-white font-normal text-[40px]'
					onClick={() => UpdateNum(0)}
				>
					4
				</button>
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#333333] fixed top-[57vh] left-[28%] text-white font-normal text-[40px]'
					onClick={() => UpdateNum(0)}
				>
					5
				</button>
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#333333] fixed top-[57vh] left-[52%] text-white font-normal text-[40px]'
					onClick={() => UpdateNum(0)}
				>
					6
				</button>
			</div>
		</>
	);
}

export default Calculator;
