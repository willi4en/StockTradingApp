import React, {Component, useState} from "react";
import PropTypes, { func } from 'prop-types';
import './algorithmObject.scss';
import Rule from './RuleObject'
import { Type } from "typescript";

export default function Algorithm ({id, name, handleDelete, handleRunClick}) {

    const [ruleList, setRule] = useState([])
    const [stockValue, setStockVal] = useState("")

    const handleAddRule = () => {
        const rule = {
            id: self.crypto.randomUUID(),
            isBuy: "buy",
            variable: "currentPrice",
            value: null,
            comparison: "equal"
        }

        setRule([...ruleList, rule])
        console.log("New rule was create: ", rule)
    }

    const handleDeleteRule = (id) => {
        setRule(ruleList.filter(rule => rule.id !== id))
        console.log("Delete Rule", id)
    }

    const updateStockInput = (event) => {
        setStockVal(event.target.value)
    }

    const runClick = () => {
        console.log({id: id, name: name, stockCode: stockValue, ruleList: ruleList })
    }

    return (
        <div className="algorithmObject-container">
            <div className="objectHeader-container">
                <label className="algorithmObject-label">{name}</label>
                <input className="stock-input" placeholder={"  Stock Code"} onChange={updateStockInput}></input>
                <button className="algorithmObject-addBtn" onClick={() => runClick()}>Run</button>
                <div className="algBtn-center">
                    <button className="algorithmObject-addBtn" onClick={() => handleAddRule()}>Add</button>
                    <button className="algorithmObject-deleteBtn" onClick={() => handleDelete(id)}>Delete</button>
                </div>                
            </div>
            {ruleList.map(rule => (
                <Rule
                onDelete={handleDeleteRule}
                key={rule.id}
                {...rule}
                />
            ))}
        </div>
    )
    
    
}

Algorithm.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    stockCode: PropTypes.string,
    ruleList: PropTypes.array,
    handleDelete: PropTypes.func,
    handleRunClick: PropTypes.func
}