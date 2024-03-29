class EditCar {
    constructor() {
        this.nameInput = document.querySelector('#carName')
        this.rentPerDayInput = document.querySelector('#rentPerDay')
        this.sizeInput = document.getElementsByName("carSize");
        this.sizeInputSelector = `input[name="carSize"]:checked`;
        this.imgInput = document.querySelector('#carImg')
        this.submitBtn = document.getElementById('save-car-btn')
        this.cancelBtn = document.getElementById('cancel-btn')
        this.formOverlay = document.querySelector('.form-overlay')
        this.needToUploadNewImg = false
        this.picFile
        this.savedImgId = ''
        this.savedImgUrl = ''

        const params = new URLSearchParams(window.location.search)
        this.carId = params.get('id')
    }
    async getCarData() {
        const url = `http://localhost:8000/api/v1/cars/${this.carId}`
        return fetch(url)
            .then((response) => response.json()
                .then((body) => {
                    return body.data
                })
                .catch(error => {
                    console.error(error);
                })
            )
    }
    async loadForm() {
        const data = await this.getCarData()
        this.nameInput.value = data.name
        this.rentPerDayInput.value = data.rent_per_day

        const carSize = ["small", "medium", "large"]
        const selectedSize = this.sizeInput[carSize.indexOf(data.size)]
        selectedSize.checked = true
        const sizeInputRoot = document.querySelector('.select-input')
        sizeInputRoot.querySelector('.select-btn-span').innerHTML = data.size.chartAt(0).toUpperCase() + data.size.slice(1)

        const [imgExt] = data.image_url.split('.').slice(-1)
        this.picFile = data.image_id + '.' + imgExt
        this.imgInput.parentNode.querySelector('span').innerHTML = this.picFile
        this.imgInput.parentNode.querySelector('span').style.color = '#000'

        this.submitBtn.disabled = false
        this.submitBtn.classList.remove('disabled')
    }

    async uploadImg() {
        const formData = new FormData();
        formData.append('picture', this.imgInput.files[0]);

        const url = 'http://localhost:8000/api/v1/cars/img/cloudinary';

        return fetch(url, {
            method: 'POST',
            body: formData
        })
            .then((response) => response.json())
            .then((body) => {
                return body
            })
            .catch(err => {
                console.error(err.message);
            });
    }

    async editCarData() {
        const url = `http://localhost:8000/api/v1/cars/${this.carId}`;
        let data = {
            name: this.nameInput.value,
            size: document.querySelector(this.sizeInputSelector).value,
            rent_per_day: parseInt(this.rentPerDayInput.value),
            editImg: false
        }
        if (this.needToUploadNewImg) {
            data = {
                ...data,
                image_id: this.savedImgId,
                image_url: this.savedImgUrl,
                editImg: true
            }
        }

        return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((body) => {
                return body.data
            })
            .catch(error => {
                console.error(error);
            });
    }

    init() {
        this.cancelBtn.onclick = () => {
            history.back();
        }

        this.submitBtn.onclick = async () => {
            if (!this.submitBtn.disabled) {
                this.formOverlay.classList.add("active");

                if (this.picFile !== this.imgInput.parentNode.querySelector("span").innerHTML) {
                    const response = await this.uploadImg();
                    this.savedImgUrl = response.url;
                    this.savedImgId = response.public_id;
                    this.needToUploadNewImg = true;
                }

                let hostname = location.protocol + "//" + location.host;
                await this.editCarData()
                    .then(res => {
                        hostname += "?action=edit&status=success";
                    }).catch(error => {
                        console.error(error);
                        hostname += "?action=edit&status=failed";
                    }).finally(() => {
                        location.href = hostname;
                    })
            }
        }

        this.loadForm();
    }

}