Vue.component("manager-products", {
    data: function() {
        return {
            products: [],
            showNewProduct: false,
            productForUpdate: null,
            productForUpdateBackup: null,
            errorMessage: ''
        }
    },
    template:         
        `<div>
            <!-- Modal dialog for update -->
            <div v-if="productForUpdateBackup !== null" class="modal fade" id="updateProduct">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header justify-content-center">
                            <div class="editProductHeader">
                                
                                <img :src="productForUpdateBackup.imagePath" style="height: 200px; width: auto;">
                                <button class="btn btn-over-image-x" v-on:click="hideEditDialog"><img src="../images/x.png"></button>

                                <label for="file-upload" class="btn btn-over-image-edit custom-file-upload">
                                    Izmeni sliku
                                </label>
                                <input id="file-upload" type="file" v-on:change="imagePathChanged" accept="image/*" /> 

                                <button class="btn btn-over-image-delete">Izbriši proizvod</button>
                            </div>
                            
                        </div>
                        <div class="modal-body text-center rounded" style="background-color: #f2f2f2;">
                            <h1 class="product-name">Izmena proizvoda</h1>
                            <br/>

                            <form v-on:submit="updateProduct">
                                <div class="form-group input-field">
                                <input type="text" class="form-control input-field" placeholder="Naziv" disabled
                                    v-model="productForUpdateBackup.name">
                                </div>
                                <div class="form-group">
                                <input type="number" step="0.01" class="form-control input-field" placeholder="Cena" required="required"
                                v-model="productForUpdateBackup.price">					
                                </div>

                                <div class="form-group">
                                    <select class="form-select input-field" v-model="productForUpdateBackup.type">
                                        <option value="FOOD">Jelo</option>
                                        <option value="DRINK">Piće</option>
                                    </select>					
                                </div>

                                <div class="form-group">
                                <input type="text" class="form-control input-field" placeholder="Opis (Opciono)"
                                v-model="productForUpdateBackup.description">					
                                </div>
                                <div class="form-group">
                                <input type="number" class="form-control input-field" placeholder="Količina (Opciono)"
                                v-model="productForUpdateBackup.quantity">					
                                </div>

                                <p style="color: red; font-size: smaller;" class="text-center">{{errorMessage}}</p>

                                <br/>
                                <div class="form-group submitButton">
                                <input type="submit" class="btn btn-primary btn-block" value="Potvrdi" id="submitButton">
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>

            <div class="container py-3">
                <div class="row">
                    <div class="col-md-2 newProductButton">
                        <button class="btn" style="background-color: #3b535f; color: white;" v-on:click="showNewProduct = true"> Novi proizvod </button>
                    </div>
                </div>
                
                <div class="row justify-content-center" style="margin-bottom: 50px;">
                    <div class="col-md-8">
                        <div class="card shadow pt-4" style="height: auto">

                            <div v-for="p in products" v-if="products !== null">
                                <div class="row p-4" v-on:click="showEditDialog(p)">
                                    <div class="col-md-3">
                                        <img :src=p.imagePath alt="Product image" height="170px" style="width: 170px" class="mx-2">
                                    </div>
                                    <div class="col-md-7">
                                        <div class="row">
                                            <p class="product-name" style="font-size: 24px;"> {{p.name}} </p>
                                        </div>
                                        <div class="row">
                                            <p class="product-description">{{p.description}}</p>
                                        </div>
                                    </div>

                                    <div class="col-md-2 commentStatus">
                                        <div class="row">
                                            <p class="ml-4" style="font-size: 18px; color: #C75D4F; font-weight: bold;"> 
                                                {{Number(p.price).toFixed(2)}} RSD 
                                            </p>
                                        </div>
                                    </div>

                                </div>
                                <hr/>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <new-product-modal v-if="showNewProduct" @close="showNewProduct = false" @update_list="updateList">	</new-product-modal>

            </div>

        </div>`,
    mounted() {
        axios.get('../rest/restaurants/getAllProducts')
			.then(response => {
				this.products = response.data;
			});
    },
    methods: {
        showEditDialog: function(product) {
            this.productForUpdate = product;
            this.productForUpdateBackup = JSON.parse(JSON.stringify(this.productForUpdate));
            $('#updateProduct').modal('show');
        },
        hideEditDialog: function() {
            $('#updateProduct').modal('hide');
        },
        imagePathChanged: function (e) {
            var files = e.target.files || e.dataTransfer.files;
            try{
                //this.productForUpdateBackup.imagePath = files[0].name;
                this.getBase64(files[0]).then(
                    data => {
                      axios.post('../rest/restaurants/uploadImage', {data64: data, fileName: files[0].name})
                        .then(response => this.productForUpdateBackup.imagePath = response.data);
                    }
                  );
            }
            catch(err){
                //this.productForUpdateBackup.imagePath = 'Error loading image';
            }
        },
        updateList: function(){
            axios.get('../rest/restaurants/getAllProducts')
			.then(response => {
				this.products = response.data;
			});
        },
        getBase64: function(file) {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => resolve(reader.result);
              reader.onerror = error => reject(error);
            });
        },
        updateProduct: function(event){
            event.preventDefault();
            axios.post('../rest/restaurants/updateItem', this.productForUpdateBackup)
                .then(response => {
                    this.updateList();
                    this.hideEditDialog();
                });
        }
    }
});