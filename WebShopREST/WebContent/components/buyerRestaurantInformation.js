Vue.component("restaurant-information", {
    data: function() {
        return {

        }
    },
    template: 
        `<div class="container py-5 px-5">
            <div class="row">
                    <div class="card shadow" style="height: 500px">
                        <div class="row">
                            <div class="col-md-5 pt-5">
                                <div class="informationContent">
                                    <img src="../images/restaurantType.png">
                                    <span class="informationTextBig">&ensp;Rostilj</span>
                                </div>
                                <div class="informationContent">
                                    <img src="../images/time.png">
                                    <span class="informationTextBig">&ensp;Otvoreno</span>
                                </div>
                                <div class="informationContent">
                                    <img src="../images/location.png">
                                    <span class="informationTextBig">&ensp;Adresa</span>
                                </div>
                                <div class="informationContentAddress" style="margin-top: -30px;">
                                    <span>Dimitrija Avramovica </span><span>19</span>
                                </div>
                                <div class="informationContentAddress">
                                    <span>Novi Sad </span><span>21000</span>
                                </div>
                                <div class="informationContentAddress">
                                    <span>45.249057, </span><span>19.845991</span>
                                </div>
                                <div class="informationContent">
                                    <img src="../images/star2.png">
                                    <span class="informationTextMark">&ensp;4.5</span>
                                </div>
                            </div>
                            <div class="col-md-7 text-center ">
                                mapa
                            </div>
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

