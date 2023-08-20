// Creation of functionality in the calculator
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ""
        this.previousOperand = ""
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
    if (this.currentOperand.length < 16) {
        if (number === "." && this.currentOperand.includes(".")) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
}

    choseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand != '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = Math.round((prev + current)*100)/100
                break;
            case '-':
                computation = Math.round((prev - current)*100)/100
                break;
            case '*':
                computation = Math.round((prev * current)*100)/100
                break;
            case '÷':
                computation = Math.round((prev / current)*100)/100
                break;
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    changeOperand() {
        this.currentOperand *= -1
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation} `
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

// Linking variables button from HTML document into javascript
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const changeOperandButton = document.querySelector('[data-change-operation]')




// Creating a calculator with defined functionality from the Calculator class
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

// Giving buttons functionality from JavaScript
document.addEventListener("keydown", (event) => {
let input = event.key
if (input > -1 && input < 10) {
    calculator.appendNumber(Number(event.key))
    calculator.updateDisplay()
} else if (input == "-" || input == "+" || input == "/" || input == "*") {
    calculator.choseOperation(event.key)
    calculator.updateDisplay()
} else if (input == "Enter" || input == "=") {
    calculator.compute()
    calculator.updateDisplay()
} else if (input == "Backspace") {
    calculator.delete()
    calculator.updateDisplay()
}
})


numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.choseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

allClearButton.addEventListener("click", () => {
    calculator.clear()
    calculator.updateDisplay()
})

equalsButton.addEventListener("click", () => {
    calculator.compute()
    calculator.updateDisplay()
})

deleteButton.addEventListener("click", () => {
    calculator.delete()
    calculator.updateDisplay()
})

changeOperandButton.addEventListener("click", () => {
    calculator.changeOperand()
    calculator.updateDisplay()
})





// const story = document.querySelector(".story")

// const setText = document.body.querySelector("#one")
// setText.addEventListener("click", (one) => {
//     story.textContent = one + "It was a dark and stormy night..."
// });

// const clearText = document.body.querySelector('#two');
// clearText.addEventListener("click", () => {
//     story.textContent = "";
// });