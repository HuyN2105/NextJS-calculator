'use client';

import { useEffect, useState } from 'react';

function Calculator() {
	const [Num, UpdateNum] = useState(0);
	const [OldNum, UpdateOldNum] = useState(0);
	const [OperationID, UpdateOperationID] = useState(0); // 1: / | 2: * | 3: - | 4: + | 5: =
	const [OldOperation, UpdateOldOperation] = useState(0);
	const [NumLength, UpdateNumLength] = useState(1);

	const [NumIndicate, UpdateNumIndicate] = useState('0');

	useEffect(() => {
		if (NumLength < 3) UpdateNumIndicate(Num + '');
		var IsPositive = true;
		if (Num < 0) IsPositive = false;
		var s = Math.abs(Num).toString();
		var startIndex =
			s.search(',') < 0
				? Math.trunc(Math.log10(Math.abs(Num)))
				: s.search(',') - 1;
		var count = 0;
		for (var i = startIndex; i > 0; i--) {
			count++;
			if (count == 3) {
				count = 0;
				s = s.substring(0, i) + '.' + s.substring(i, s.length);
			}
		}
		UpdateNumIndicate((IsPositive ? '' : '-') + s);
	}, [Num]);

	function AddToNum(NumToAdd: number) {
		if (OperationID != 0) {
			if (OldNum != 0) {
				Calculation(0);
			} else {
				UpdateOldNum(Num);
			}
			UpdateNum(NumToAdd);
			UpdateNumLength(1);
		} else if (Num < 1e8) {
			UpdateNum(Num * 10 + NumToAdd);
			UpdateNumLength(NumLength + 1);
		}
	}

	function CalculationOperationPair(num1: number, num2: number) {
		var Operation = OperationID == 0 ? OldOperation : OperationID;
		if (OldOperation == 0 && OperationID == 0) return Num;
		if (Operation == 1) return num1 / num2;
		if (Operation == 2) return num1 * num2;
		if (Operation == 3) return num1 - num2;
		if (Operation == 4) return num1 + num2;
		return 0;
	}

	function Calculation(ActionID: number) {
		// ActionID is for determining whether the calculator should do the calculation needed with the current num and the old num to continue with the math or just display the answer
		// ActionID: 0: to be continue with the math | 1: display the answer

		// CALCULATION FUNCTION
		if (ActionID == 0) {
			console.log('Num: ', Num);
			UpdateOldNum(CalculationOperationPair(OldNum, Num));
		} else {
			UpdateNum(CalculationOperationPair(OldNum, Num));
		}
		// SLOW DOWN BITCH
		UpdateOldOperation(OperationID);
		UpdateOperationID(0);
	}

	function EraseNum() {
		if (OldOperation == 0) {
			UpdateNum(0);
			UpdateOldNum(0);
		} else if (Num != 0) {
			UpdateNum(0);
			UpdateNumLength(1);
		} else if (OldNum != 0) {
			UpdateOldNum(0);
		}
	}

	return (
		<>
			<div className='w-[430px] h-[860px] rounded-[20px] bg-black fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-[35px]'>
				{/* Number */}
				<div
					id='NumberIndicate'
					className='w-[346px] h-[70px] fixed top-[218px] left-[42px] text-white text-right font-light'
				>
					<p className='-translate-y-8 text-[90px]'>{NumIndicate}</p>
				</div>

				{/* CSS STYLE ON CONDITION */}
				{/* LOWERING NUMBER FONT SIZE ON NUMBER GETTING LARGER UP TO AVOID SCREEN OVERFLOW */}
				<style jsx>{`
					#NumberIndicate p {
						font-size: ${NumLength > 7
							? 90 - (NumLength - 7) * 8 + 'px'
							: '90px'};
						transform: translate(
							${0},
							${NumLength > 7 ? -32 + (NumLength - 7) * 7 + 'px' : '-32px'}
						);
					}
				`}</style>

				{/* 1st ROW */}

				<button
					className='w-1/5 h-[10%] rounded-full bg-[#a5a5a5] fixed top-[35vh] left-[4%] text-black'
					onClick={() => EraseNum()}
				>
					{Num != 0 ? 'C' : 'AC'}
				</button>
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#a5a5a5] fixed top-[35vh] left-[28%] text-black'
					onClick={() => UpdateNum(Num * -1)}
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
					onClick={() => UpdateNum(Num / 100)}
				>
					%
				</button>
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#ff9f0a] fixed top-[35vh] left-[76%] text-[#fffeff]'
					onClick={() => UpdateOperationID(1)}
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
					onClick={() => UpdateOperationID(2)}
					id={`${OperationID == 2 ? 'selected' : ''}`}
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
					onClick={() => UpdateOperationID(3)}
					id={`${OperationID == 3 ? 'selected' : ''}`}
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
					onClick={() => UpdateOperationID(4)}
					id={`${OperationID == 4 ? 'selected' : ''}`}
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
					onClick={() => Calculation(1)}
				>
					<div className='w-[22px] h-[4px] absolute top-[39px] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fffeff]'></div>
					<div className='w-[22px] h-[4px] absolute top-[50px] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fffeff]'></div>
				</button>
			</div>
		</>
	);
}

export default Calculator;
