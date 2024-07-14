'use client';

import { useState } from 'react';

function Calculator() {
	const [Num, UpdateNum] = useState(0);

	function NumberFormat(NumToFormat: number) {
		var s = NumToFormat.toString();
		if (s.length < 3) return s;
		var startIndex =
			s.search(',') < 0
				? Math.trunc(Math.log10(NumToFormat))
				: s.search(',') - 1;
		var count = 0;
		for (var i = startIndex; i > 0; i--) {
			count++;
			if (count == 3) {
				count = 0;
				s = s.substring(0, i) + '.' + s.substring(i, s.length);
			}
		}
		return s;
	}

	function AddToNum(NumToAdd: number) {
		UpdateNum(Num * 10 + NumToAdd);

		// TODO: FIX THIS ERROR WITH MAKING NUMBER SMALLER WHEN EXCEEDED A CERTAIN AMOUNT OF LENGTH

		// if (Math.trunc(Math.log10(Num)) + 1 > 6) {
		// 	document.getElementById('NumberIndicator')!.style.fontSize = '10px';
		// }
	}

	return (
		<>
			<div className='w-[430px] h-[860px] rounded-[20px] bg-black fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-[35px]'>
				{/* Number */}
				<div
					id='NumberIndicate'
					className='w-[346px] h-[70px] fixed top-[218px] left-[42px] text-white text-right text-[90px] font-thin'
				>
					<p className='-translate-y-8'>{NumberFormat(Num)}</p>
				</div>

				{/* 1st ROW */}

				<button
					className='w-1/5 h-[10%] rounded-full bg-[#a5a5a5] fixed top-[35vh] left-[4%] text-black'
					onClick={() => UpdateNum(0)}
				>
					AC
				</button>
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#a5a5a5] fixed top-[35vh] left-[28%] text-black'
					onClick={() => AddToNum(0)}
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
					onClick={() => AddToNum(0)}
				>
					%
				</button>
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#ff9f0a] fixed top-[35vh] left-[76%] text-[#fffeff]'
					onClick={() => AddToNum(0)}
				>
					<div className='w-[5px] h-[5px] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-3 bg-[#fffeff]'></div>
					<div className='w-[5px] h-[5px] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1.5 bg-[#fffeff]'></div>
					<div className='w-[28%] h-[4px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fffeff]'></div>
				</button>

				{/* 2nd ROW */}

				<button
					className='w-1/5 h-[10%] rounded-full bg-[#333333] fixed top-[46vh] left-[4%] text-white font-normal text-[40px]'
					onClick={() => AddToNum(7)}
				>
					7
				</button>
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#333333] fixed top-[46vh] left-[28%] text-white font-normal text-[40px]'
					onClick={() => AddToNum(8)}
				>
					8
				</button>
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#333333] fixed top-[46vh] left-[52%] text-white font-normal text-[40px]'
					onClick={() => AddToNum(9)}
				>
					9
				</button>
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#ff9f0a] fixed top-[46vh] left-[76%] text-[#fffeff]'
					onClick={() => AddToNum(0)}
				>
					<div className='w-[33%] h-[4px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fffeff] rotate-45'></div>
					<div className='w-[33%] h-[4px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fffeff] -rotate-45'></div>
				</button>

				{/* 3rd ROW */}

				<button
					className='w-1/5 h-[10%] rounded-full bg-[#333333] fixed top-[57vh] left-[4%] text-white font-normal text-[40px]'
					onClick={() => AddToNum(4)}
				>
					4
				</button>
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#333333] fixed top-[57vh] left-[28%] text-white font-normal text-[40px]'
					onClick={() => AddToNum(5)}
				>
					5
				</button>
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#333333] fixed top-[57vh] left-[52%] text-white font-normal text-[40px]'
					onClick={() => AddToNum(6)}
				>
					6
				</button>
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#ff9f0a] fixed top-[57vh] left-[76%] text-[#fffeff]'
					onClick={() => AddToNum(0)}
				>
					<div className='w-[22px] h-[5px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fffeff]'></div>
				</button>

				{/* 4th ROW */}

				<button
					className='w-1/5 h-[10%] rounded-full bg-[#333333] fixed top-[68vh] left-[4%] text-white font-normal text-[40px]'
					onClick={() => AddToNum(1)}
				>
					1
				</button>
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#333333] fixed top-[68vh] left-[28%] text-white font-normal text-[40px]'
					onClick={() => AddToNum(2)}
				>
					2
				</button>
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#333333] fixed top-[68vh] left-[52%] text-white font-normal text-[40px]'
					onClick={() => AddToNum(3)}
				>
					3
				</button>
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#ff9f0a] fixed top-[68vh] left-[76%] text-[#fffeff]'
					onClick={() => AddToNum(0)}
				>
					<div className='w-[22px] h-[4px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fffeff]'></div>
					<div className='w-[22px] h-[4px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fffeff] rotate-90'></div>
				</button>

				{/* 5th ROW */}

				<button
					id='ZeroButton'
					className='w-[43.5%] h-[10%] bg-[#333333] fixed top-[79vh] left-[4%] text-white font-normal text-[40px] text-left pl-8'
					onClick={() => AddToNum(0)}
				>
					0
				</button>
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#333333] fixed top-[79vh] left-[52%] text-white font-normal text-[40px]'
					onClick={() => AddToNum(0)}
				>
					,
				</button>
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#ff9f0a] fixed top-[79vh] left-[76%] text-[#fffeff]'
					onClick={() => AddToNum(0)}
				>
					<div className='w-[22px] h-[4px] absolute top-[39px] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fffeff]'></div>
					<div className='w-[22px] h-[4px] absolute top-[50px] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fffeff]'></div>
				</button>
			</div>
		</>
	);
}

export default Calculator;
