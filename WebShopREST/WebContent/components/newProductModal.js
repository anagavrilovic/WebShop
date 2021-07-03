Vue.component("new-product-modal", {
    data: function() {
        return {
            imagePath : ''
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
                  <form>
                    <div class="form-group input-field">
                      <input type="text" class="form-control input-field" placeholder="Naziv" required="required">
                    </div>

                    <div class="form-group">
                      <input type="text" class="form-control input-field" placeholder="Cena" required="required">					
                    </div>

                    <div class="form-group">
                        <select class="form-select input-field" area-label="Pol">
                        <option selected disabled>Tip proizvoda</option>
                            <option value="1">Jelo</option>
                            <option value="2">Piće</option>
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
                      <input type="text" class="form-control input-field" placeholder="Opis (Opciono)" required="required">					
                    </div>

                    <div class="form-group">
                      <input type="text" class="form-control input-field" placeholder="Količina (Opciono)" required="required">					
                    </div>

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
        }
        catch(err){
            this.imagePath = 'Error loading image';
        }
    }
  }
  });