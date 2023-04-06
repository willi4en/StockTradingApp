import React, {useState} from "react"
import PropTypes from 'prop-types';
import './RuleObject.scss';

export default function Rule({id, onDelete}) {

    const [isBuy, setIsBuy] = useState("Buy")
    const [variable, setVariable] = useState("CurrentPrice")
    const [value, setValue] = useState("")
    const [comparison, setComparison] = useState("equal")

    const updateIsBuy = (event) => {
        setIsBuy(event.target.value)
    }

    const updateVariable = (event) => {
        setVariable(event.target.value)
    }

    const updateValue = (event) => {
        setValue(event.target.value)
    }

    const updateComparison = (event) => {
        setComparison(event.target.value)
    }

    return (
        <div className="ruleObject-container">
            <select className="select-container" name="buyOrSell" id="buyOrSell" onChange={updateIsBuy}>
                <option className="select-option" value={"Buy"}>Buy</option>
                <option className="select-option" value={"Sell"}>Sell</option>
            </select>
            <select className="select-container" name="variable" id="variable" onChange={updateVariable}>
                <option className="select-option" value={"CurrentPrice"}>Current Price</option>
                <option className="select-option" value={"Open"}>Open</option>
                <option className="select-option" value={"High"}>High</option>
                <option className="select-option" value={"Low"}>Low</option>
            </select>
            <select className="select-container" name="comparison" id="comparison"  onChange={updateValue}>
                <option className="select-option" value={"equal"}>=</option>
                <option className="select-option" value={"lessThan"}>&lt;</option>
                <option className="select-option" value={"lessThanOrEqual"}>&lt;=</option>
                <option className="select-option" value={"greaterThan"}>&gt;</option>
                <option className="select-option" value={"greaterThanOrEqual"}>&gt;=</option>
            </select>
            <input className="value-container" placeholder="  Value" onChange={updateComparison}></input>
            <button className="deleteBtn" onClick={() => onDelete(id)}>Delete</button>
        </div>
    )
}

Rule.propTypes = {
    id: PropTypes.string,
    isBuy: PropTypes.string,
    variable: PropTypes.string,
    value: PropTypes.number,
    comparison: PropTypes.string,
    onDelete: PropTypes.func
}