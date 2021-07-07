Vue.component("new-product-modal", {
    data: function() {
        return {
            imagePath : '',
            newProduct: {
              name: undefined,
              price: undefined,
              type: '',
              description: undefined,
              quantity: undefined,
              imagePath: ''
            },
            errrorMessage: '',
            selectedFile: ''
        }
    },
    template: `
      <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-container modal-container1 modal-login" id="formId">
  
                <div class="modal-header">
                  <h4 class="modal-title"> Novi proizvod </h4>
                  <button type="button" class="btn-close" aria-hidden="true" @click="$emit('close')"></button>
                </div>
  
                <div class="modal-body modal-body1">
                  <form v-on:submit="addNewProduct">
                    <div class="form-group input-field">
                      <input type="text" class="form-control input-field" placeholder="Naziv" required="required" v-model="newProduct.name">
                    </div>

                    <div class="form-group">
                      <input type="number" step="0.01" class="form-control input-field" placeholder="Cena" required="required" v-model="newProduct.price">					
                    </div>

                    <div class="form-group">
                        <select class="form-select input-field" area-label="Tip proizvoda" v-model="newProduct.type" required="required">
                        <option disabled selected value=''>Tip proizvoda</option>
                            <option value="0">Jelo</option>
                            <option value="1">Piće</option>
                        </select>					
                    </div>


                    <div>
                        <label for="file-upload" class="btn btn-primary custom-file-upload">
                            Izaberite sliku
                        </label>
                        <input id="file-upload" type="file" v-on:change="imagePathChanged" accept="image/*" /> 
                        <input id="uploadFile" placeholder="File Name here" disabled="disabled" v-model="imagePath" class="input-field" 
                          style="height: 40px; width: 240px"/>
                    </div>

                    <div class="form-group">
                      <input type="text" class="form-control input-field" placeholder="Opis (Opciono)" v-model="newProduct.description">					
                    </div>

                    <div class="form-group">
                      <input type="number" step="1" class="form-control input-field" placeholder="Količina (Opciono)" v-model="newProduct.quantity">					
                    </div>

                    <p style="color: red; font-size: smaller;" class="text-center">{{errrorMessage}}</p>

                    <div class="form-group submitButton">
                      <input type="submit" class="btn btn-primary btn-block" value="Potvrdi" id="submitButton" style="margin-top: 50px; width: 100px">
                    </div>
                  </form>
                </div>
  
              </div>
            </div>
          </div>
        </transition>
  `,
  methods: {
    imagePathChanged: function (e) {
        var files = e.target.files || e.dataTransfer.files;
        try{
            this.imagePath = files[0].name;
            console.log(files[0]);
            this.selectedFile = files[0];
            this.newProduct.imagePath = '../images/' + this.imagePath;
           

        }
        catch(err){
            this.imagePath = 'Error loading image';
        }
    },
    addNewProduct: function(e){
      e.preventDefault();
      axios.get('../rest/restaurants/validateItemName/' + this.newProduct.name)
        .then(response => {
              if(response.data){
                this.errrorMessage = 'Artikal sa datim imenom već postoji.';
                return;
              } else {
                axios.post('../rest/restaurants/addNewItem', this.newProduct)
                  .then(response => {
                    this.$emit('close');

                    // upload image to server side
                    this.getBase64(this.selectedFile).then(
                      data => {
                        axios.post('../rest/restaurants/uploadImage', {data64: data, fileName: this.imagePath})
                          .then(response => console.log(response.data));
                      }
                    );
                  })
                  .catch(function (error) {
                    if (error.response) {
                      // Request made and server responded
                      console.log(error.response.data);
                      console.log(error.response.status);
                      console.log(error.response.headers);
                    } else if (error.request) {
                      // The request was made but no response was received
                      console.log(error.request);
                    } else {
                      // Something happened in setting up the request that triggered an Error
                      console.log('Error', error.message);
                    }
                
                  });
              }
        })
        .catch(function (error) {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
      
        });
    },
    getBase64: function(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }
  }
  });