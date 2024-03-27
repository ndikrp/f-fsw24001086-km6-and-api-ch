class UploadImage {
    constructor(renderId, placeholderText, iconPath, varName, validationLabelId) {
        this.renderId = renderId
        this.placeholderText = placeholderText
        this.iconPath = iconPath
        this.varName = varName
        this.validationLabelId = validationLabelId
        this.renderElement = document.getElementById(renderId)
        this.validationLabelElement = document.getElementById(validationLabelId)
    }
    render() {
        const element =
            `
        <button type="button">
        <input type="file" accept="image/*" name="${this.varName}" id="${this.varName}">
        <span>${this.placeholderText}</span>
        <img src="${this.iconPath}" alt="upload-icon">
        </button>
        `
        this.renderElement.innerHTML = element
        this.renderElement.classList.add('file-input')
    }

    init() {
        const PLACEHOLDER_COLOR = "#D0D0D0"
        const SELECTED_COLOR = "#000"

        const inputTextElement = this.renderElement.querySelector('span')
        inputTextElement.style.color = PLACEHOLDER_COLOR

        const uploadBtn = this.renderElement.querySelector('button')
        const inputElement = this.renderElement.querySelector('input')

        uploadBtn.onClick = () => {
            inputElement.click()
        }

        inputElement.onchange = () => {
            const IMG_TYPE = ["jpeg", "png", "jpg", "svg"]

            let fileName = inputElement.files[0].name
            const imgType = fileName.split('.').slice(-1)[0].toLocaleLowerCase()

            let inputIsValid = true

            if (!IMG_TYPE.includes(imgType)) {
                this.validationLabelElement.innerHTML = "File must be image type"
                inputIsValid = false
            } else if (inputElement.files[0].size > 5000000) {
                this.validationLabelElement.innerHTML = "File size is too big, max 5 MB"
                inputIsValid = false
            } else {
                this.validationLabelElement.innerHTML = "File size max 5 MB"
            }

            if (inputIsValid) {
                inputTextElement.style.color = SELECTED_COLOR
                uploadBtn.style.borderColor = SELECTED_COLOR
                this.validationLabelElement.style.color = PLACEHOLDER_COLOR
            } else {
                inputElement.value = ''
                inputTextElement.style.color = PLACEHOLDER_COLOR
                uploadBtn.style.borderColor = '#ff0000'
                this.validationLabelElement.style.color = '#ff0000'
                fileName = this.placeholderText
            }
            inputElement.innerHTML = fileName
        }
    }
}