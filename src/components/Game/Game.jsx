import React, {useEffect, useRef} from "react";
import styles from './Game.module.css';
import {useState} from "react";

const Game = ({matrixLength}) => {
    const [cellsValues, setCellsValues] = useState([])
    const clickCount = useRef(0)
    const nextStep = useRef("X")

    const reset = () => {
        generateCells()
        nextStep.current = "X"
        clickCount.current = 0
    }

    const calculateWinner = (clickedRowIndex, clickedColIndex) => {
        const cellValue = cellsValues[clickedRowIndex][clickedColIndex]
        let valueForChecking = cellValue
        let horizontalVal, verticalVal, leftCornerVal, rightCornerVal = null
        let breakHorizontal, breakVertical, breakLeftCorner, breakRightCorner = false;

        for (let i = 0; i < matrixLength; i++) {
            horizontalVal = breakHorizontal ? null : cellsValues[clickedRowIndex][i]
            verticalVal = breakVertical ? null : cellsValues[i][clickedColIndex]
            leftCornerVal = breakLeftCorner ? null : cellsValues[i][i]
            rightCornerVal = breakRightCorner ? null : cellsValues[i][cellsValues.length - 1 - i]

            if (!breakHorizontal && (horizontalVal !== valueForChecking)) breakHorizontal = true
            if (!breakVertical && (verticalVal !== valueForChecking)) breakVertical = true
            if (!breakLeftCorner && (leftCornerVal !== valueForChecking)) breakLeftCorner = true
            if (!breakRightCorner && (rightCornerVal !== valueForChecking)) breakRightCorner = true

        }

        if (horizontalVal === cellValue ||
            verticalVal === cellValue ||
            leftCornerVal === cellValue ||
            rightCornerVal === cellValue
        ) {
            alert(`Winner is ${cellValue}`)
            reset()
            return;
        }

        if (clickCount.current === (matrixLength ** 2)) {
            alert("It is draw")
            reset()
        }
    }

    const onCellClick = (i, j) => {
        let cellsValuesCopy = [...cellsValues]
        if (cellsValuesCopy[i][j]) {
            return;
        }
        clickCount.current += 1
        cellsValuesCopy[i][j] = nextStep.current;
        nextStep.current = nextStep.current === "X" ? "O" : "X"
        setCellsValues(cellsValuesCopy)

        //do not calculate when clicked less than matrixLength ---- refactor
        if(clickCount.current < matrixLength) return;
        setTimeout(() => calculateWinner(i, j), 0)
    }

    const generateCells = () => {
        let cellsValuesCopy = []

        for (let i = 0; i < matrixLength; i++) {
            let rowCells = []

            for (let j = 0; j < matrixLength; j++) {
                rowCells[j] = null
            }

            cellsValuesCopy[i] = rowCells
        }
        setCellsValues(cellsValuesCopy)
    }

    useEffect(() => {
        reset()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matrixLength])

    return (
        <div className={styles.table}>
            {
                cellsValues.map((rowCells, i) => (
                    <div className={styles.row} key={i}>
                        {
                            rowCells.map((cell, j) => (
                                <button key={j} className={styles.cell} onClick={() => onCellClick(i, j)}>
                                    {cell}
                                </button>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    );
}

export default Game;