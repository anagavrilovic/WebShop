Vue.component("manager-products", {
    data: function() {
        return {
            products: [
                {name: 'Paradajz',  description: 'Najjača stvar na svetu je paradajz. Najveći ljubitelj paradjza je Ančibald.', price: 180, imagePath: '../images/tomato.png'},
                {name: 'Paprika',  description: 'Najjača stvar na svetu je paprika. Najveći ljubitelj paprike je Aranđel Golubović.', price: 230, imagePath: '../images/strawberry.png'},
                {name: 'Jagorčevina',  description: 'Najjača stvar na svetu je jagorčevina. Najveći ljubitelj jagorčevine je komšija Godzila.', price: 20, imagePath: '../images/potato.png'}
            ]
        }
    },
    template:         
        `<div class="container py-5">
            <div class="row">
                <div class="col-md-2 newProductButton">
                    <button class="btn btn-primary"> Novi proizvod </button>
                </div>
            </div>
            
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card shadow pt-4" style="height: auto">

                        <div v-for="p in products" v-if="products !== null">
                            <div class="row p-4">
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
        </div>`,
    mounted() {

    },
    methods: {
        
    }
});