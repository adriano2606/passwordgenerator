let charset ='abc*defg{}hijkl!&mnop!qrst%uvwxyz@-=+ABCD$EFG#HI!@JKLMNO()PQRSTUV-WXYZ12-34567890[]'
let lowerCaseChar = 'abcdefghijklmnopqrstuvwjyz'
let upperCaseChar = lowerCaseChar.toUpperCase()
let specialChar = '!@#$%&*()-=+[]~/'
let numbersChar = '1234567890'
const range = document.getElementById('range')
let rangeValue = range.value
const CharQuantity = document.getElementById('CharQuantity')
const button = document.getElementById('button')
const newPassBox = document.getElementById('newPassBox')
const newPassField = document.getElementById('newPass')
const lowerCaseOption = document.getElementById('lowerCaseOption')
const upperCaseOption = document.getElementById('upperCaseOption')
const specialCaseOption = document.getElementById('specialCharOption')
const numberCharOption = document.getElementById('numberCharOption')
let isLowerCaseCharMandatory = 0
let isUpperCaseCharMandatory = 0
let isSpecialCharMandatory = 0
let isNumberCharMandatory = 0
let rangeMinLength = 0
const optionList = [lowerCaseOption,upperCaseOption,specialCaseOption,numberCharOption]

function setMinumiumRange(){
    if (lowerCaseOption.checked == true){
        rangeMinLength += 1
        isLowerCaseCharMandatory = 1
    }
    
    if (upperCaseOption.checked == true){
        rangeMinLength += 1
        isUpperCaseCharMandatory = 1
    
    }
    
    if (specialCaseOption.checked == true){
        rangeMinLength += 1
        isSpecialCharMandatory = 1
    }

    if (numberCharOption.checked == true){
        rangeMinLength += 1
        isNumberCharMandatory = 1
    }
    
    range.setAttribute('min', rangeMinLength)
}

function generatePassword2(){
    
    let pass = ''
    let array = []
    if (isLowerCaseCharMandatory == 1 ){
        array.push(lowerCaseChar)
    }
    if (isUpperCaseCharMandatory == 1 ){
        array.push(upperCaseChar)
    }
    if (isSpecialCharMandatory == 1 ){
        array.push(specialChar)
    }
    if (isNumberCharMandatory == 1){
        array.push(numbersChar)
    }

    console.log(array)
    
    let specialCharIndex = -1
    let upperCaseCharIndex = -1
    let lowerCaseCharIndex = -1
    let numberCharIndex = -1
    
    if (isLowerCaseCharMandatory === 1){
        lowerCaseCharIndex = Math.floor(Math.random() * rangeValue)
    }    

    if (isUpperCaseCharMandatory === 1){
        upperCaseCharIndex = Math.floor(Math.random() * rangeValue)
        while (upperCaseCharIndex == lowerCaseCharIndex){
            upperCaseCharIndex = Math.floor(Math.random() * rangeValue)
        }
    }

    if (isSpecialCharMandatory === 1){
        specialCharIndex = Math.floor(Math.random() * rangeValue)
        while(specialCharIndex == lowerCaseCharIndex || specialCharIndex == upperCaseCharIndex){
            specialCharIndex = Math.floor(Math.random() * rangeValue)
        }
    } 

    if (isNumberCharMandatory === 1){
        numberCharIndex = Math.floor(Math.random() * rangeValue)
        while(numberCharIndex == lowerCaseCharIndex || numberCharIndex == upperCaseCharIndex || numberCharIndex == specialCharIndex ){
            numberCharIndex = Math.floor(Math.random() * rangeValue)
        }
    } 

    
    for(i = 0; i < rangeValue; i++){

            if (i == specialCharIndex){
                pass+= specialChar.charAt(Math.floor(Math.random() * specialChar.length))
            } else if (i == upperCaseCharIndex){
                pass+= upperCaseChar.charAt(Math.floor(Math.random() * upperCaseChar.length))
            } else if(i == lowerCaseCharIndex){
                pass+= lowerCaseChar.charAt(Math.floor(Math.random() * lowerCaseChar.length))
            } else if (i == numberCharIndex){
                pass+= numbersChar.charAt(Math.floor(Math.random() * numbersChar.length))
            } else if(array == '') {
                pass+= 'Select at least one option below...'
                newPassField.innerText = pass
                break
            } else {
                let tipo = Math.floor(Math.random() * array.length)
                pass+= array[tipo].charAt(Math.floor(Math.random() * array[tipo].length))
            }
        
    }

    newPassField.innerText = pass
}

setMinumiumRange()
CharQuantity.innerText = rangeValue
generatePassword2()

range.oninput = function(){
    rangeValue = this.value
    CharQuantity.innerText = rangeValue
    generatePassword2()
}

button.onclick = () =>{
    generatePassword2()
}

optionList.forEach((element,index) => {
    
    element.onclick = () =>{
        element.toggleAttribute('checked')
        console.log(element)
        if (element.checked == false){
            rangeMinLength -= 1
            if (index == 0){
                isLowerCaseCharMandatory = 0
            } else if (index == 1){
                isUpperCaseCharMandatory = 0
            } else if(index == 2){
                isSpecialCharMandatory = 0
            } else if (index == 3){
                isNumberCharMandatory = 0
            }
        } else {
            rangeMinLength += 1
            if (index == 0){
                isLowerCaseCharMandatory = 1
            } else if (index == 1){
                isUpperCaseCharMandatory = 1
            } else if(index == 2){
                isSpecialCharMandatory = 1
            } else if(index == 3){
                isNumberCharMandatory = 1
            }
        }

        range.setAttribute('min', rangeMinLength)
        console.log('min' + rangeMinLength)
        console.log('value' + rangeValue)

        if (rangeMinLength > rangeValue){
            rangeValue = rangeMinLength
            CharQuantity.innerText = rangeValue
            console.log('value após att' + rangeMinLength)
        }
    }
});


