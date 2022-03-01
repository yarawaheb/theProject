
import React, { useState, useEffect } from 'react';
import './equipmentList.css';
import { AiOutlinePlus,AiOutlineCheckCircle} from "react-icons/ai";
import {RiCheckboxBlankCircleFill} from "react-icons/ri";
import {CgChevronLeft} from "react-icons/cg";
import {CgChevronRight} from "react-icons/cg";
export  function EquipmentList() {
	// HINT: each "item" in our list names a name,
	// a boolean to tell if its been completed, and a quantity
	const [items, setItems] = useState([
		{ itemName: 'shoes', quantity: 1, isSelected: false },
		
	]);

	const [inputValue, setInputValue] = useState('');
	const [totalItemCount, setTotalItemCount] = useState(1);

	const handleAddButtonClick = () => {
		const newItem = {
			itemName: inputValue,
			quantity: 1,
			isSelected: false,
		};

		const newItems = [...items, newItem];

		setItems(newItems);
		setInputValue('');
		calculateTotal();
	};

	const handleQuantityIncrease = (index: number) => {
		const newItems = [...items];

		newItems[index].quantity++;

		setItems(newItems);
		calculateTotal();
	};

	const handleQuantityDecrease = (index: number) => {
		const newItems = [...items];

		newItems[index].quantity--;

		setItems(newItems);
		calculateTotal();
	};

	const toggleComplete = (index: number) => {
		const newItems = [...items];

		newItems[index].isSelected = !newItems[index].isSelected;

		setItems(newItems);
	};

	const calculateTotal = () => {
		const totalItemCount = items.reduce((total, item) => {
			return total + item.quantity;
		}, 0);

		setTotalItemCount(totalItemCount);
	};

	return (
			<div className='mainContainer'>
				<div className='add-item-box'>
					<input value={inputValue} onChange={(event) => setInputValue(event.target.value)} className='add-item-input' placeholder='Add an item...' />
					<AiOutlinePlus  onClick={() => handleAddButtonClick()} ></AiOutlinePlus>
				</div>
				<div className='item-list'>
					{items.map((item, index) => (
						<div className='item-container'>
							<div className='item-name' onClick={() => toggleComplete(index)}>
								{item.isSelected ? (
									<>
										<AiOutlineCheckCircle ></AiOutlineCheckCircle> 
										<span className='completed'>{item.itemName}</span>
									</>
								) : (
									<>
										<RiCheckboxBlankCircleFill ></RiCheckboxBlankCircleFill> 
										<span>{item.itemName}</span>
									</>
								)}
							</div>
							<div className='quantity'>
								<button>
									<CgChevronLeft  onClick={() => handleQuantityDecrease(index)} ></CgChevronLeft>
								</button>
								<span> {item.quantity} </span>
								<button>
									<CgChevronRight  onClick={() => handleQuantityIncrease(index)} ></CgChevronRight>
								</button>
							</div>
						</div>
					))}
				</div>
				<div className='total'>Total: {totalItemCount}</div>
			</div>
	);
};

