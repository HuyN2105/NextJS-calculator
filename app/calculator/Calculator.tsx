'use client';

import { calculateSizeAdjustValues } from 'next/dist/server/font-utils';
import { useEffect, useRef, useState } from 'react';

const Operations = {
	DIVIDE: 1,
	MULTIPLY: 2,
	SUBTRACT: 3,
	ADD: 4,
};

function Calculator() {
	// Initializing variables
	const [Num, UpdateNum] = useState(0);
	const [PreviousNum, UpdatePreviousNum] = useState(0);
	const [OperationID, UpdateOperationID] = useState(0); // 1: / | 2: * | 3: - | 4: + | 5: =
	const [OngoingOperationID, UpdateOngoingOperationID] = useState(0);
	const [NumLength, UpdateNumLength] = useState(0);
	const [InvalidOperation, UpdateInvalidOperation] = useState(false);
	const [NumIndicate, UpdateNumIndicate] = useState('0');
	const [CompletedCalculation, UpdateCompletedCalculation] = useState(false);

	// { sr for this comment but it's just for the annoying prettier not capable of ignore single line but the whole file }
	// prettier-ignore
	const KeyActions: {[key: string]: () => void} = {
		'Escape': () => EraseNum(),
		'/': () => UpdateOperation(1),
		'*': () => UpdateOperation(2),
		'x': () => UpdateOperation(2),
		'-': () => UpdateOperation(3),
		'+': () => UpdateOperation(4),
		'%': () => UpdateNum(Number((NumRef.current / 100).toPrecision(12))),
		'Enter': () => Calculation(1),
		'=': () => Calculation(1),
		'Backspace': () => UpdateNum(Math.trunc(NumRef.current / 10))
	};

	// Reference to ensure keydown function gets the latest updated data

	const NumRef = useRef(Num);
	const PreviousNumRef = useRef(PreviousNum);
	const OngoingOperationIDRef = useRef(OngoingOperationID);
	const OperationIDRef = useRef(OperationID);
	const InvalidOperationRef = useRef(InvalidOperation);
	const NumLengthRef = useRef(NumLength);
	const CompletedCalculationRef = useRef(CompletedCalculation);

	// Reference updater

	useEffect(() => {
		NumRef.current = Num;
	}, [Num]);
	useEffect(() => {
		PreviousNumRef.current = PreviousNum;
	}, [PreviousNum]);
	useEffect(() => {
		OngoingOperationIDRef.current = OngoingOperationID;
	}, [OngoingOperationID]);
	useEffect(() => {
		OperationIDRef.current = OperationID;
	}, [OperationID]);
	useEffect(() => {
		InvalidOperationRef.current = InvalidOperation;
	}, [InvalidOperation]);
	useEffect(() => {
		NumLengthRef.current = Num === 0 ? 0 : Math.trunc(Math.log10(Num)) + 1;
	}, [Num]);
	useEffect(() => {
		CompletedCalculationRef.current = CompletedCalculation;
	}, [CompletedCalculation]);

	// Variables for swipe to undo number add function on mobile device

	const [TouchStartPositionX, UpdateTouchStartPositionX] = useState(-1);

	const TouchStartPositionXRef = useRef(TouchStartPositionX);

	useEffect(() => {
		TouchStartPositionXRef.current = TouchStartPositionX;
	}, [TouchStartPositionX]);

	// Number formatting process

	useEffect(() => {
		if (NumLengthRef.current < 3) UpdateNumIndicate(NumRef.current.toString());
		var IsPositive = true;
		if (NumRef.current < 0) IsPositive = false;
		var s = Math.abs(NumRef.current).toString().replace('.', ',');
		var startIndex =
			s.search(',') - 1 < 0 ? NumLengthRef.current - 1 : s.search(',') - 1;
		var count = 0;
		for (var i = startIndex; i > 0; i--) {
			count++;
			if (count === 3) {
				count = 0;
				s = s.substring(0, i) + '.' + s.substring(i, s.length);
			}
		}
		UpdateNumIndicate(
			InvalidOperationRef.current ? 'Error' : (IsPositive ? '' : '-') + s
		);
	}, [Num, InvalidOperation]);

	// Reset all variables to it's initial state

	function reset() {
		UpdateNum(0);
		UpdatePreviousNum(0);
		UpdateOperationID(0);
		UpdateOngoingOperationID(0);
		UpdateNumLength(0);
		UpdateInvalidOperation(false);
		UpdateCompletedCalculation(false);
	}

	// Changing the current number value on number button pressed

	function AddToNum(NumToAdd: number) {
		if (CompletedCalculationRef.current) {
			reset();
			UpdateNum(NumToAdd);
		} else if (OperationIDRef.current !== 0) {
			UpdateOngoingOperationID(OperationIDRef.current);
			UpdateOperationID(0);
			if (PreviousNumRef.current !== 0) {
				Calculation(0);
			} else {
				UpdatePreviousNum(NumRef.current);
			}
			UpdateNum(NumToAdd);
			UpdateNumLength(NumToAdd === 0 ? 0 : 1);
		} else if (NumRef.current < 1e8) {
			if (NumRef.current < 0) UpdateNum(NumRef.current * 10 - NumToAdd);
			else UpdateNum(NumRef.current * 10 + NumToAdd);
			UpdateNumLength(NumLength + 1);
		}
	}

	// Part of calculation process

	function CalculationOperationPair(
		num1: number,
		num2: number,
		OpID: number = OngoingOperationIDRef.current
	) {
		switch (OpID) {
			case Operations.DIVIDE:
				if (num2 === 0) {
					UpdateInvalidOperation(true);
					return 0;
				}
				UpdateNumLength(
					num1 === 0 ? 0 : Math.trunc(Math.log10(Math.abs(num1 / num2))) + 1
				);
				return num1 / num2;
			case Operations.MULTIPLY:
				UpdateNumLength(
					num1 * num2 === 0
						? 0
						: Math.trunc(Math.log10(Math.abs(num1 * num2))) + 1
				);
				return num1 * num2;
			case Operations.SUBTRACT:
				UpdateNumLength(
					num1 - num2 === 0
						? 0
						: Math.trunc(Math.log10(Math.abs(num1 - num2))) + 1
				);
				return num1 - num2;
			case Operations.ADD:
				UpdateNumLength(
					num1 + num2 === 0
						? 0
						: Math.trunc(Math.log10(Math.abs(num1 + num2))) + 1
				);
				return num1 + num2;
			default:
				return num1 === 0 ? num2 : num1;
		}
	}

	// The calculation process

	function Calculation(ActionID: number) {
		// ActionID is for determining whether the calculator should do the calculation needed with the current num and the old num to continue with the math or just display the answer
		// ActionID: 0: to be continue with the math | 1: display the answer

		// DEBUG
		console.log(NumRef.current, PreviousNumRef.current);

		// CALCULATION FUNCTION
		if (ActionID === 0) {
			UpdatePreviousNum(
				CalculationOperationPair(
					PreviousNumRef.current,
					NumRef.current,
					OperationIDRef.current
				)
			);
			UpdateOngoingOperationID(OperationIDRef.current);
		} else {
			if (OperationIDRef.current !== 0) {
				UpdateNum(
					CalculationOperationPair(
						NumRef.current,
						NumRef.current,
						OperationIDRef.current
					)
				);
			} else
				UpdateNum(
					CalculationOperationPair(PreviousNumRef.current, NumRef.current)
				);
			UpdatePreviousNum(0);
			UpdateOngoingOperationID(0);
			UpdateCompletedCalculation(true);
		}
		UpdateOperationID(0);
	}

	function EraseNum() {
		if (InvalidOperationRef.current) reset();
		else if (OngoingOperationIDRef.current === 0) {
			UpdateNum(0);
			UpdatePreviousNum(0);
			UpdateNumLength(0);
			UpdateOperationID(0);
		} else if (NumRef.current !== 0) {
			UpdateNum(0);
			UpdateNumLength(0);
			UpdateOperationID(OngoingOperationIDRef.current);
			UpdateOngoingOperationID(0);
		} else if (PreviousNumRef.current !== 0) reset();
	}

	function UpdateOperation(OpID: number) {
		if (OngoingOperationIDRef.current !== 0 && OperationIDRef.current === 0) {
			UpdateNum(
				CalculationOperationPair(NumRef.current, PreviousNumRef.current)
			);
		}
		if (CompletedCalculationRef.current) UpdateCompletedCalculation(false);
		UpdateOperationID(OpID);
	}

	// Keydown process ( including backspace function and number input on keyboard for pc user )

	useEffect(() => {
		// Main handler
		const keyDownHandler = (e: KeyboardEvent) => {
			if (KeyActions[e.key]) {
				KeyActions[e.key]();
			} else if (e.key !== ' ' && !isNaN(+e.key)) AddToNum(+e.key);
			else
				console.log(
					`Key pressed was excluded for the calculator: %c${e.key}`,
					'color: #bada55'
				);
		};

		document.addEventListener('keydown', keyDownHandler);

		// clean up
		return () => {
			document.removeEventListener('keydown', keyDownHandler);
		};
	}, []);

	// Swipe to undo number add function for mobile device

	useEffect(() => {
		const touchStartHandler = (e: any) => {
			e = e || window.event;

			var pageX = e.pageX;
			var pageY = e.pageY;

			// IE 8
			if (pageX === undefined) {
				pageX =
					e.clientX +
					document.body.scrollLeft +
					document.documentElement.scrollLeft;
				pageY =
					e.clientY +
					document.body.scrollTop +
					document.documentElement.scrollTop;
			}
			if (pageY < 225) UpdateTouchStartPositionX(pageX);
		};
		const touchEndHandler = (e: any) => {
			if (TouchStartPositionXRef.current != -1) {
				e = e || window.event;

				var pageX = e.pageX;

				// IE 8
				if (pageX === undefined)
					pageX =
						e.clientX +
						document.body.scrollLeft +
						document.documentElement.scrollLeft;
				if (pageX > TouchStartPositionXRef.current)
					UpdateNum(Math.trunc(NumRef.current / 10));
				UpdateTouchStartPositionX(-1);
			}
		};

		document
			.getElementById('NumberIndicate')!
			.addEventListener('touchstart', touchStartHandler);
		document
			.getElementById('NumberIndicate')!
			.addEventListener('touchend', touchEndHandler);
		return () => {
			document.removeEventListener('touchstart', touchStartHandler);
			document.removeEventListener('touchend', touchEndHandler);
		};
	}, []);

	// App

	return (
		<>
			<div className='w-[430px] h-[860px] rounded-[20px] bg-black fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-[35px]'>
				{/* Number */}
				<div
					id='NumberIndicate'
					className='w-[346px] h-[70px] fixed top-[180px] left-[42px] text-white text-right font-light'
				>
					<p className='-translate-y-8 text-[90px]'>{NumIndicate}</p>
				</div>

				{/* CSS STYLE ON CONDITION */}
				{/* LOWERING NUMBER FONT SIZE ON NUMBER GETTING LARGER UP TO AVOID SCREEN OVERFLOW */}
				<style jsx>{`
					#NumberIndicate p {
						font-size: ${NumLengthRef.current > 6
							? 90 -
							  (NumLengthRef.current - (NumRef.current < 0 ? 5 : 6)) * 8 +
							  'px'
							: '90px'};
						transform: translate(
							${0},
							${NumLengthRef.current > 6
								? -32 +
								  (NumLengthRef.current - (NumRef.current < 0 ? 5 : 6)) * 7 +
								  'px'
								: '-32px'}
						);
					}
				`}</style>

				{/* 1st ROW */}

				<button
					className='w-1/5 h-[10%] rounded-full bg-[#a5a5a5] fixed top-[290px] left-[4%] text-black'
					onClick={() => EraseNum()}
				>
					{Num != 0 ? 'C' : 'AC'}
				</button>
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#a5a5a5] fixed top-[290px] left-[28%] text-black'
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
					className='w-1/5 h-[10%] rounded-full bg-[#a5a5a5] fixed top-[290px] left-[52%] text-black'
					onClick={() => UpdateNum(Number((Num / 100).toPrecision(12)))}
				>
					%
				</button>
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#ff9f0a] fixed top-[290px] left-[76%] text-[#fffeff]'
					onClick={() => UpdateOperation(1)}
					id={`${OperationID === 1 ? 'selected' : ''}`}
				>
					<div className='w-[5px] h-[5px] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-3 bg-[#fffeff]'></div>
					<div className='w-[5px] h-[5px] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1.5 bg-[#fffeff]'></div>
					<div className='w-[28%] h-[4px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fffeff]'></div>
				</button>

				{/* 2nd ROW */}

				<button
					className='w-1/5 h-[10%] rounded-full bg-[#333333] fixed top-[390px] left-[4%] text-white font-normal text-[40px]'
					onClick={() => AddToNum(7)}
				>
					7
				</button>
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#333333] fixed top-[390px] left-[28%] text-white font-normal text-[40px]'
					onClick={() => AddToNum(8)}
				>
					8
				</button>
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#333333] fixed top-[390px] left-[52%] text-white font-normal text-[40px]'
					onClick={() => AddToNum(9)}
				>
					9
				</button>
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#ff9f0a] fixed top-[390px] left-[76%] text-[#fffeff]'
					onClick={() => UpdateOperation(2)}
					id={`${OperationID == 2 ? 'selected' : ''}`}
				>
					<div className='w-[33%] h-[4px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fffeff] rotate-45'></div>
					<div className='w-[33%] h-[4px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fffeff] -rotate-45'></div>
				</button>

				{/* 3rd ROW */}

				<button
					className='w-1/5 h-[10%] rounded-full bg-[#333333] fixed top-[491px] left-[4%] text-white font-normal text-[40px]'
					onClick={() => AddToNum(4)}
				>
					4
				</button>
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#333333] fixed top-[491px] left-[28%] text-white font-normal text-[40px]'
					onClick={() => AddToNum(5)}
				>
					5
				</button>
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#333333] fixed top-[491px] left-[52%] text-white font-normal text-[40px]'
					onClick={() => AddToNum(6)}
				>
					6
				</button>
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#ff9f0a] fixed top-[491px] left-[76%] text-[#fffeff]'
					onClick={() => UpdateOperation(3)}
					id={`${OperationID == 3 ? 'selected' : ''}`}
				>
					<div className='w-[22px] h-[5px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fffeff]'></div>
				</button>

				{/* 4th ROW */}

				<button
					className='w-1/5 h-[10%] rounded-full bg-[#333333] fixed top-[591px] left-[4%] text-white font-normal text-[40px]'
					onClick={() => AddToNum(1)}
				>
					1
				</button>
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#333333] fixed top-[591px] left-[28%] text-white font-normal text-[40px]'
					onClick={() => AddToNum(2)}
				>
					2
				</button>
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#333333] fixed top-[591px] left-[52%] text-white font-normal text-[40px]'
					onClick={() => AddToNum(3)}
				>
					3
				</button>
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#ff9f0a] fixed top-[591px] left-[76%] text-[#fffeff]'
					onClick={() => UpdateOperation(4)}
					id={`${OperationID == 4 ? 'selected' : ''}`}
				>
					<div className='w-[22px] h-[4px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fffeff]'></div>
					<div className='w-[22px] h-[4px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fffeff] rotate-90'></div>
				</button>

				{/* 5th ROW */}

				<button
					id='ZeroButton'
					className='w-[43.5%] h-[10%] bg-[#333333] fixed top-[692px] left-[4%] text-white font-normal text-[40px] text-left pl-8'
					onClick={() => AddToNum(0)}
				>
					0
				</button>
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#333333] fixed top-[692px] left-[52%] text-white font-normal text-[40px]'
					onClick={() => AddToNum(0)}
				>
					,
				</button>
				<button
					className='w-1/5 h-[10%] rounded-full bg-[#ff9f0a] fixed top-[692px] left-[76%] text-[#fffeff]'
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
