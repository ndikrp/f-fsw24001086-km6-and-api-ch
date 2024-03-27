class AddCar {
    constructor() {
        this.nameInput = document.querySelector('#carName')
        this.rentPerDayInput = document.querySelector('#rentPerDay')
        this.sizeInput = `input[name="carSize"]:checked`
        this.imgInput = document.querySelector('#carImg')
        this.submitBtn = document.getElementById('save-car-btn')
        this.cancelBtn = document.getElementById('cancel-btn')
        this.formOverlay = document.querySelector('.form-overlay')

        this.savedImgId = ''
        this.savedImgUrl = ''
    }

    async insertNewCar() {
        const url = `http://localhost:8000/api/v1/cars`
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

    async uploadImg() {
        const formData = new FormData();
        formData.append("picture", this.imgInput.files[0]);
        const url = `http://localhost:8000/api/v1/cars/img/cloudinary`;

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

    displayImage() {
        const imgElement = document.createElement('img');
        imgElement.src = this.savedImgUrl;
        // Append the image element to a container on your dashboard
        const container = document.getElementById('image-container');
        container.appendChild(imgElement);
    }
    
    init() {
        this.cancelBtn.onclick = () => {
            history.back();
        }

        this.submitBtn.onclick = async () => {
            if (!this.submitBtn.disabled) {
                this.formOverlay.classList.add("active");

                const response = await this.uploadImg();
                this.savedImgUrl = response.url;
                this.savedImgId = response.public_id;

                let hostname = location.protocol + "//" + location.host;
                await this.insertNewCar()
                    .then(res => {
                        hostname += "?action=add&status=success";
                    }).catch(error => {
                        console.error(error);
                        hostname += "?action=add&status=failed";
                    }).finally(() => {
                        location.href = hostname;
                    })
            }
        }
    }

}