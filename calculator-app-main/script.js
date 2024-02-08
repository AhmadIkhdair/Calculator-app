class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }
  
    clear() {
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
    }
  
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
  
    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return

      this.currentOperand = this.currentOperand.toString() + number.toString()
    }
  
    chooseOperation(operation) {
      if (this.currentOperand === '') return
      if (this.previousOperand !== '') {
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
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case 'x':
          computation = prev * current
          break
        case '*': //For the keypress
          computation = prev * current
          break          
        case '/':
          computation = prev / current
          break
        default:
          return
      }

      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''
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
      this.currentOperandTextElement.innerText =
        this.getDisplayNumber(this.currentOperand)
      if (this.operation != null) {
        this.previousOperandTextElement.innerText =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      } else {
        this.previousOperandTextElement.innerText = ''
      }
    }
  }

 //* ------------BUTTON CLICKING------------

  const numberButtons = document.querySelectorAll('[data-number]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const equalsButton = document.querySelector('[data-equals]')
  const deleteButton = document.querySelector('[data-delete]')
  const resetButton = document.querySelector('[data-reset]')

  const previousOperandTextElement = document.querySelector('[data-previous-operand]')
  const currentOperandTextElement = document.querySelector('[data-current-operand]')

  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })

  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })

  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })

  resetButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })

  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })

 //* ------------KEY PRESSING------------
 
 document.addEventListener('keydown', (event) => {
  const key = event.key;

  // Number or .
  if (!isNaN(key) || key === '.') {
    calculator.appendNumber(key);
    calculator.updateDisplay();
  }
  // Operation
  else if (['+', '-', '*', '/'].includes(key)) {
    calculator.chooseOperation(key);
    calculator.updateDisplay();
  }
  // Equals
  else if (key === '=' || key === 'Enter') {
    calculator.compute();
    calculator.updateDisplay();
  }
  // Delete (Backspace)
  else if (key === 'Backspace') {
    calculator.delete();
    calculator.updateDisplay();
  }
  // Reset (Escape)
  else if (key === 'Escape') {
    calculator.clear();
    calculator.updateDisplay();
  }
});

 //* ------------THEME HANDLING------------

 document.querySelector('#searchTypeToggle').addEventListener('click', function(event) {
    
  if (event.target.tagName.toLowerCase() == 'input') {
      
      let input = event.target;
      let slider = this.querySelector('div');
      let parentLabel = input.parentNode;
      
      slider.style.transform = `translateX(${input.dataset.location})`;

      // Check the ID of the parent label of the clicked input
      if (parentLabel.id === "theme1") {
          console.log("Theme1");
          document.querySelector('html').removeAttribute('data-theme');
          document.querySelector('.head').style.color = '';
          document.querySelector('.output').style.color = '';
          document.querySelector('form > div').innerHTML = '1';
          document.querySelector('form > div').style.color = 'white';
          document.querySelector('.equal').style.color = '';
      } else if (parentLabel.id === "theme2") {
          console.log("Theme2");
          document.querySelector('html').setAttribute('data-theme', 'theme2');
          document.querySelector('.head').style.color = 'hsl(60, 10%, 19%)';
          document.querySelector('.output').style.color = 'hsl(60, 10%, 19%)';
          document.querySelector('form > div').innerHTML = '2';
          document.querySelector('form > div').style.color = 'white';
          document.querySelector('.equal').style.color = '';
      } else if (parentLabel.id === "theme3") {
          console.log("Theme3");
          document.querySelector('html').setAttribute('data-theme', 'theme3');
          document.querySelector('.head').style.color = 'hsl(52, 100%, 62%)';
          document.querySelector('.output').style.color = 'hsl(52, 100%, 62%)';
          document.querySelector('form > div').innerHTML = '3';
          document.querySelector('form > div').style.color = 'hsl(221, 14%, 31%)';
          document.querySelector('.equal').style.color = 'hsl(221, 14%, 31%)';
      }
  }
});