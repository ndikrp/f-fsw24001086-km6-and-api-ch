const carSizeInput = new SizeDropdown(
    "Small",
    "car-size-input",
    "assets/icons/input_dropdown.svg",
    "carSize",
    {
        "Small": "small",
        "Medium": "medium",
        "Large": "large",
    }
)

carSizeInput.render()
carSizeInput.init()

const carPicInput = new UploadImage(
    "pic-input",
    "Click to select file",
    "assets/icons/upload.svg",
    "carImg",
    "pic-input-validation"
)
carPicInput.render()
carPicInput.init()

// FORM
const carNameInput = document.querySelector('#carName')
const rentPerDayInput = document.querySelector('#rentPerDay')
const sizeInput = ('carSize')
const imgInput = document.querySelector('#carImg')

const sizeInputSelectedSelector = `input[name=${sizeInput}]:checked`
const submitBtn = document.getElementById('#save-car-btn')
const cancelBtn = document.getElementById('#cancel-btn')

const toggleSubmitBtn = () => {
    if (activate) {
        submitBtn.disabled = false
        submitBtn.classList.remove('disabled')
    } else {
        submitBtn.disabled = true
        submitBtn.classList.add('disabled')
    }
}

toggleSubmitBtn(false)

const formValidation = () => {
    let isValid = true

    if (carNameInput.value === '') isValid = false
    if (rentPerDayInput.value === '') isValid = false
    const imgInputText = imgInput.parentNode.querySelector('span')
    if (imgInputText.innerHTML === 'Click to select file...') isValid = false
    const sizeInputValue = document.querySelector(sizeInputSelectedSelector).value
    if (sizeInputValue === null) sizeInput[0].checked = true
    return isValid
}

const inputEventHandler = () => {
    toggleSubmitBtn(formValidation())
}

const formInputArr = [
    carNameInput,
    rentPerDayInput,
    imgInput
]
for (const input of formInputArr) {
    input.addEventListener('change', inputEventHandler)
}

const rupiahInputElement = document.querySelector("#rentPerDay");

const validateStringNum = (str) => {
    if (typeof str != "string") return false  
    return !isNaN(str) && 
        !isNaN(parseFloat(str)) 
}

let prevValue = ''
rupiahInputElement.addEventListener("change", () => {
    const inputVal = rupiahInputElement.value
    if (inputVal = '') return
    if (validateStringNum(inputVal)) {
        prevValue = inputVal
        return
    } else {
        rupiahInputElement.value = prevValue
    }
})