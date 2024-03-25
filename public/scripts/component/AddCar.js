class AddCar {
    constructor() {
        this.nameInput = document.querySelector('#carName')
        this.rentPerDayInput = document.querySelector('#rentPerDay')
        this.sizeInput = `input[name="carSize"]:checked`
        this.imgInput = document.querySelector('#carImg')
        this.submitBtn = document.getElementById('#save-car-btn')
        this.cancelBtn = document.getElementById('#cancel-btn')
        this.formOverlay = document.querySelector('.form-overlay')

        this.savedImgId = ''
        this.savedImgUrl = ''
    }

    async insertNewCar() {
        const url = `http://localhost:3000/api/v1/cars`
        const data = {
            name: this.nameInput.value,
            rentPerDay: parseInt(this.rentPerDayInput.value),
            size: document.querySelector(this.sizeInput).value,
            imgId: this.savedImgId,
            imgUrl: this.savedImgUrl
        }
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(body => {
                return body.data
            })
            .catch(err => {
                console.log(err)
            })
    }

    // init() {
    //     this.cancelBtn.onclick = async () => {
    //         if (!this.submitBtn.disabled) {
    //             this.formOverlay.classList.add('active')

    //             const response = await this.
    //         }
    //     }
    // }
}