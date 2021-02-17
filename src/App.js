import './App.css';
import React, { useState, setState } from 'react';


function Display(props) {
	return(
		<div className="display">
			{props.value}
		</div>
	);
}

class NumberSection extends React.Component {
	render() {
		return(
			<div className="numberSection">
				<div className="nineNums">
					<button className="btn" onClick={() => this.props.onClick(7)}>
						7
					</button>
					<button className="btn" onClick={() => this.props.onClick(8)}>
						8
					</button>
					<button className="btn" onClick={() => this.props.onClick(9)}>
						9
					</button>
					<button className="btn" onClick={() => this.props.onClick(4)}>
						4
					</button>
					<button className="btn" onClick={() => this.props.onClick(5)}>
						5
					</button>
					<button className="btn" onClick={() => this.props.onClick(6)}>
						6
					</button>
					<button className="btn" onClick={() => this.props.onClick(1)}>
						1
					</button>
					<button className="btn" onClick={() => this.props.onClick(2)}>
						2
					</button>
					<button className="btn" onClick={() => this.props.onClick(3)}>
						3
					</button>
				</div>
				<button className={`btn long`} onClick={() => this.props.onClick(0)}>
					0
				</button>
				<button className="btn" onClick={() => this.props.onClick('.')}>
					.
				</button>
			</div>
		);
	}
}

class OperatorSection extends React.Component {
	render() {
		return(
			<div className="operatorSection">
				<button className={`btn btnAC long`} onClick={() => this.props.onClick('AC')}>
					AC
				</button>
				<div className="operators">
					<button className={`btn btnOp`} onClick={() => this.props.onClick('x')}>
						x
					</button>
					<button className={`btn btnOp`} onClick={() => this.props.onClick('/')}>
						/
					</button>
					<button className={`btn btnOp`} onClick={() => this.props.onClick('+')}>
						+
					</button>
					<button className={`btn btnOp`} onClick={() => this.props.onClick('-')}>
						-
					</button>
				</div>
				<button className={`btn btnEqual long`} onClick={() => this.props.onClick('=')}>
					=
				</button>
			</div>
		);
	}
}

class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displayString: "0",
			currAnswer: 0.0,
			currNumber: 0.0,
			operator: null,
			hasDecimal: false,
			decCounter: 0,
		}
	}

	handleClickNum(i) {
		if (this.state.displayString.length > 12) { return; }
		
		if (i == '.') {
			if(this.state.hasDecimal == true) { return; }
			this.setState({
				hasDecimal: true,
				decCounter: this.state.decCounter + 1,
				displayString: this.state.displayString + ".",
			});
		}
		else {
			if(this.state.hasDecimal) {
				let newNum = this.state.currNumber + i * (1/(10 ** this.state.decCounter));

				newNum = Math.round(newNum * 10 ** this.state.decCounter) / 10 ** this.state.decCounter;

				if(this.state.decCounter > 5) { return; }
				
				let newString = "";

				if (i == 0) {
					newString = this.state.displayString + '0';
				}
				else if (this.state.operator) {
					newString = "" + this.state.currAnswer + this.state.operator + newNum;
				}
				else {
					newString = "" + newNum;
				}

				this.setState({
					currNumber: newNum,
					decCounter: this.state.decCounter + 1,
					displayString: newString,
				});
			}
			else {
				const newNum = this.state.currNumber * 10 + i;
				this.setState({
					currNumber: newNum,
					displayString: this.state.operator ? ("" + this.state.currAnswer + this.state.operator + newNum) : ("" + newNum),
				});
			}

		}
		
	}

	handleClickOp(x) {
		if (x == 'AC') {
			this.setState ({
				displayString: "0",
				currAnswer: 0.0,
				currNumber: 0.0,
				operator: null,
				hasDecimal: false,
				decCounter: 0,
			});
		}
		else if (x == '=') {
			if (!this.state.operator) { return; }
			let newAns = 0;
			if (this.state.operator == '+') {
				newAns = this.state.currAnswer + this.state.currNumber;
			}
			else if (this.state.operator == '-') {
				newAns = this.state.currAnswer - this.state.currNumber;
			}
			else if (this.state.operator == 'x') {
				newAns = this.state.currAnswer * this.state.currNumber;
			}
			else if (this.state.operator == '/') {
				newAns = this.state.currAnswer / this.state.currNumber;
			}
			newAns = Math.round(newAns * 10 ** 5) / 10 ** 5;
			this.setState ({
				displayString: "" + newAns,
				currAnswer: 0.0,
				currNumber: 0.0,
				operator: null,
				hasDecimal: false,
				decCounter: 0,
			});
		}
		else {
			if (this.state.operator) { return; }
			this.setState ({
				displayString: this.state.displayString + x,
				currAnswer: this.state.currNumber,
				currNumber: 0.0,
				operator: x,
				hasDecimal: false,
				decCounter: 0,
			});
		}

	}

	render() {
		return (
			<div className="calculatorBoard">
				<Display value={this.state.displayString}/>
				<div className="bottomPart">
					<NumberSection
						onClick={ i => this.handleClickNum(i)}
					/>
					<OperatorSection 
						onClick={ x => this.handleClickOp(x)}
					/>
				</div>
			</div>
		);
	}
}

export default Calculator;
