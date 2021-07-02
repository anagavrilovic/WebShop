Vue.component("manager-products", {
    data: function() {
        return {
            products: [
                {name: 'Paradajz',  description: 'Najjača stvar na svetu je paradajz. Najveći ljubitelj paradjza je Ančibald.', price: 180, imagePath: '../images/tomato.png'},
                {name: 'Paprika',  description: 'Najjača stvar na svetu je paprika. Najveći ljubitelj paprike je Aranđel Golubović.', price: 230, imagePath: '../images/strawberry.png'},
                {name: 'Jagorčevina',  description: 'Najjača stvar na svetu je jagorčevina. Najveći ljubitelj jagorčevine je komšija Godzila.', price: 20, imagePath: '../images/potato.png'}
            ],
            showNewProduct: false,
            productForUpdate: null
        }
    },
    template:         
        `<div>
            <!-- Modal dialog for update -->
            <div v-if="productForUpdate !== null" class="modal fade" id="updateProduct">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header justify-content-center">
                            <div class="editProductHeader">
                                
                                <img :src="productForUpdate.imagePath" style="height: 200px; width: auto;">
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

                            <form>
                                <div class="form-group input-field">
                                <input type="text" class="form-control input-field" placeholder="Naziv" required="required"
                                    v-model="productForUpdate.name">
                                </div>
                                <div class="form-group">
                                <input type="text" class="form-control input-field" placeholder="Cena" required="required"
                                v-model="productForUpdate.price">					
                                </div>
                                <div class="form-group">
                                <input type="text" class="form-control input-field" placeholder="Tip proizvoda" required="required"
                                >					
                                </div>
                                <div class="form-group">
                                <input type="text" class="form-control input-field" placeholder="Opis (Opciono)" required="required"
                                v-model="productForUpdate.description">					
                                </div>
                                <div class="form-group">
                                <input type="text" class="form-control input-field" placeholder="Količina (Opciono)" required="required"
                                >					
                                </div>
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
                                    <div class="col-md-2">
                                        <img :src=p.imagePath alt="Product image" height="100px" class="mx-2">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="row">
                                            <p> {{p.name}} </p>
                                        </div>
                                        <div class="row">
                                            <p>{{p.description}}</p>
                                        </div>
                                    </div>

                                    <div class="col-md-2 commentStatus">
                                        <div class="row">
                                            <p class="ml-4"> {{p.price}}&nbsp RSD </p>
                                        </div>
                                    </div>

                                </div>
                                <hr/>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <new-product-modal v-if="showNewProduct" @close="showNewProduct = false">	</new-product-modal>

            </div>

        </div>`,
    mounted() {

    },
    methods: {
        showEditDialog: function(product) {
            this.productForUpdate = product;
            $('#updateProduct').modal('show');
        },
        hideEditDialog: function() {
            $('#updateProduct').modal('hide');
        },
        imagePathChanged: function (e) {
            var files = e.target.files || e.dataTransfer.files;
            try{
                this.productForUpdate.imagePath = files[0].name;
            }
            catch(err){
                this.productForUpdate.imagePath = 'Error loading image';
            }
        }
    }
});