 let lowerCaseChar = 'abcdefghijklmnopqrstuvwjyz'
 let upperCaseChar = lowerCaseChar.toUpperCase()
 let specialChar = '!#$%&()*+,-./:;<=>?@[\]^_`{|}~'
 let numbersChar = '1234567890'
 const range = document.getElementById('range')
 let rangeValue = range.value
 const CharQuantity = document.getElementById('CharQuantity')
 const button = document.getElementById('button')
 const newPassField = document.getElementById('newPass')
 const lowerCaseOption = document.getElementById('lowerCaseOption')
 const upperCaseOption = document.getElementById('upperCaseOption')
 const specialCaseOption = document.getElementById('specialCharOption')
 const numberCharOption = document.getElementById('numberCharOption')
 let isLowerCaseCharMandatory = 1
 let isUpperCaseCharMandatory = 1
 let isSpecialCharMandatory = 1
 let isNumberCharMandatory = 1
 let rangeMinLength = 4
 const optionList = [lowerCaseOption, upperCaseOption, specialCaseOption, numberCharOption]
 const IconForCopy = document.getElementById('IconForCopy')
 const correctionIcon = document.getElementById('correctionIcon')
 const copiedNotification = document.getElementById('copiedNotification')

 function changeMandatoryStatus(index, status) {

     if (index == 0) {
         isLowerCaseCharMandatory = status

     } else if (index == 1) {
         isUpperCaseCharMandatory = status

     } else if (index == 2) {
         isSpecialCharMandatory = status

     } else if (index == 3) {
         isNumberCharMandatory = status

     }
 }

 function generateCharsetArray(array) {
     if (isLowerCaseCharMandatory == 1) {
         array.push(lowerCaseChar)
     }

     if (isUpperCaseCharMandatory == 1) {
         array.push(upperCaseChar)
     }

     if (isSpecialCharMandatory == 1) {
         array.push(specialChar)
     }

     if (isNumberCharMandatory == 1) {
         array.push(numbersChar)
     }
 }

 function setMinimiumLength() {
     if (rangeMinLength > rangeValue) {
         rangeValue = rangeMinLength
         CharQuantity.innerText = rangeValue
     }
 }

 function generatePassword() {

     let pass = ''
     let array = []
     generateCharsetArray(array)

     let specialCharIndex = -1
     let upperCaseCharIndex = -1
     let lowerCaseCharIndex = -1
     let numberCharIndex = -1

     if (isLowerCaseCharMandatory === 1) {
         lowerCaseCharIndex = Math.floor(Math.random() * rangeValue)
     }

     if (isUpperCaseCharMandatory === 1) {
         upperCaseCharIndex = Math.floor(Math.random() * rangeValue)
         while (upperCaseCharIndex == lowerCaseCharIndex) {
             upperCaseCharIndex = Math.floor(Math.random() * rangeValue)
         }
     }

     if (isSpecialCharMandatory === 1) {
         specialCharIndex = Math.floor(Math.random() * rangeValue)
         while (specialCharIndex == lowerCaseCharIndex || specialCharIndex == upperCaseCharIndex) {
             specialCharIndex = Math.floor(Math.random() * rangeValue)
         }
     }

     if (isNumberCharMandatory === 1) {
         numberCharIndex = Math.floor(Math.random() * rangeValue)
         while (numberCharIndex == lowerCaseCharIndex || numberCharIndex == upperCaseCharIndex || numberCharIndex == specialCharIndex) {
             numberCharIndex = Math.floor(Math.random() * rangeValue)
         }
     }


     for (i = 0; i < rangeValue; i++) {

         if (i == specialCharIndex) {
             pass += specialChar.charAt(Math.floor(Math.random() * specialChar.length))
         } else if (i == upperCaseCharIndex) {
             pass += upperCaseChar.charAt(Math.floor(Math.random() * upperCaseChar.length))
         } else if (i == lowerCaseCharIndex) {
             pass += lowerCaseChar.charAt(Math.floor(Math.random() * lowerCaseChar.length))
         } else if (i == numberCharIndex) {
             pass += numbersChar.charAt(Math.floor(Math.random() * numbersChar.length))
         } else if (array == '') {
             pass += 'Select at least one option below...'
             break
         } else {
             let tipo = Math.floor(Math.random() * array.length)
             pass += array[tipo].charAt(Math.floor(Math.random() * array[tipo].length))
         }
     }

     if (rangeValue == 0) {
         pass += 'Select at least one option below...'
     }

     newPassField.innerText = pass
 }

 CharQuantity.innerText = rangeValue
 generatePassword()

 range.oninput = function () {
     rangeValue = this.value
     CharQuantity.innerText = rangeValue
     generatePassword()
 }

 button.onclick = () => {
     generatePassword()
 }

 optionList.forEach((element, index) => {

     element.onclick = () => {

         element.toggleAttribute('checked')

         if (element.checked == false) {

             rangeMinLength -= 1

             changeMandatoryStatus(index, 0)


         } else {

             rangeMinLength += 1

             changeMandatoryStatus(index, 1)

         }

         range.setAttribute('min', rangeMinLength)

         setMinimiumLength()
     }
 });

 IconForCopy.onclick = () => {
     navigator.clipboard.writeText(newPassField.innerText);
     correctionIcon.classList.toggle('visually-hidden')
     IconForCopy.classList.toggle('visually-hidden')
     copiedNotification.classList.toggle('visually-hidden')

     setTimeout(() => {
         correctionIcon.classList.toggle('visually-hidden')
         IconForCopy.classList.toggle('visually-hidden')
         copiedNotification.classList.toggle('visually-hidden')
     }, '500')
 }