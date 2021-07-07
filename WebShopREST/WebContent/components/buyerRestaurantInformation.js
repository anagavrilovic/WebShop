Vue.component("restaurant-information", {
    data: function() {
        return {
            restaurant: null,
            map: undefined
        }
    },
    template: 
        `<div class="container py-5" style="padding-left: 100px; padding-right: 100px;">
            <div class="row">
                    <div class="card shadow" style="height: 500px; cursor: default;">
                        <div class="row">
                            <div class="col-md-5 pt-5" v-if="restaurant !== null">
                                <div class="informationContent">
                                    <img src="../images/restaurantType.png">
                                    <span class="informationTextBig">&ensp;{{restaurant.type}}</span>
                                </div>
                                <div class="informationContent">
                                    <img src="../images/time.png">
                                    <span class="informationTextBig" v-if="isWorking(restaurant)">&ensp;Otvoreno</span>
                                    <span class="informationTextBig" v-else>&ensp;Zatvoreno</span>
                                </div>
                                <div class="informationContent">
                                    <img src="../images/location.png">
                                    <span class="informationTextBig">&ensp;Adresa</span>
                                </div>
                                <div class="informationContentAddress" style="margin-top: -30px;">
                                    <span>{{restaurant.location.address.streetName}} {{restaurant.location.address.streetNumber}}</span><span>19</span>
                                </div>
                                <div class="informationContentAddress">
                                    <span>{{restaurant.location.address.city}} {{restaurant.location.address.postalCode}}</span><span>21000</span>
                                </div>
                                <div class="informationContentAddress">
                                    <span>{{restaurant.location.longitude}}, {{restaurant.location.latitude}}</span>
                                </div>
                                <div class="informationContent">
                                    <img src="../images/star2.png">
                                    <span class="informationTextMark">&ensp;{{restaurant.mark}}</span>
                                </div>
                            </div>
                            <div id="map" class="col-md-7 map">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`,
    mounted() {
        this.map = new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([19.83, 45.25]),
                zoom: 13
            })
        });

        let id = window.location.href.split('?')[1].split('=')[1].split('#/')[0];
        axios.get('../rest/restaurants/' + id)
        .then(response => {
            this.restaurant = response.data;

            var layer = new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: [
                        new ol.Feature({
                            geometry: new ol.geom.Point(ol.proj.fromLonLat
                                ([this.restaurant.location.latitude, this.restaurant.location.longitude]))
                        })
                    ]
                })
            });
            this.map.addLayer(layer);
        });
    },
    methods: {
        isWorking: function(restaurant){
			let workTimeStart = restaurant.workTime.workTimeStart;
			let workTimeEnd = restaurant.workTime.workTimeEnd;
			let workTimeStartHours = workTimeStart.split(':')[0];
			let workTimeEndHours = workTimeEnd.split(':')[0];
				
			var today = new Date();
			var currentTimeHours = today.getHours();

			if(currentTimeHours >= workTimeStartHours && currentTimeHours < workTimeEndHours){
				return true;
			}
			else{
				return false;
			}

		},
    }
});

