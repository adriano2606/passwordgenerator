let charset ='abc*defg{}hijkl!&mnop!qrst%uvwxyz@-=+ABCD$EFG#HI!@JKLMNO()PQRSTUV-WXYZ12-34567890[]'
const range = document.getElementById('range')
let rangeValue = range.value
const CharQuantity = document.getElementById('CharQuantity')
const button = document.getElementById('button')
const newPassBox = document.getElementById('newPassBox')
const newPassField = document.getElementById('newPass')

function generatePassword(){

    let pass = ''
    for (i = 0, n = charset.length; i < rangeValue; i++){
        pass+= charset.charAt(Math.floor((Math.random() * n)))
    }
    newPassField.innerText = pass
}

CharQuantity.innerText = rangeValue
generatePassword()

range.oninput = function(){
    rangeValue = this.value
    CharQuantity.innerText = rangeValue
    generatePassword()
}

button.onclick = () =>{
    generatePassword()
}




