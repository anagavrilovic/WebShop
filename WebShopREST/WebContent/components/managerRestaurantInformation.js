var overlay = new OpenLayers.Layer.Vector('Overlay', {
    styleMap: new OpenLayers.StyleMap({
        externalGraphic: '../images/marker.png',
        graphicWidth: 20, graphicHeight: 24, graphicYOffset: -24,
        title: '${tooltip}'
    })
});

Vue.component("manager-restaurant-information", {
    data: function() {
        return {
            restaurant: null,
            map: undefined
        }
    },
    template: 
        `<div class="container py-5" style="padding-left: 100px; padding-right: 100px;">
            <div class="row">
                    <div class="card shadow" style="height: 500px; padding: 50px; cursor: default;">
                        <div class="row">
                            <div class="col-md-5" v-if="restaurant !== null">
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
                                    <span>{{restaurant.location.address.streetName}} {{restaurant.location.address.streetNumber}}</span>
                                </div>
                                <div class="informationContentAddress">
                                    <span>{{restaurant.location.address.city}} {{restaurant.location.address.postalCode}}</span>
                                </div>
                                <div class="informationContentAddress">
                                    <span>{{Number(restaurant.location.latitude).toFixed(4)}}, {{Number(restaurant.location.longitude).toFixed(4)}}</span>
                                </div>
                                <div class="informationContent">
                                    <img src="../images/star2.png">
                                    <span class="informationTextMark">&ensp;{{restaurant.mark}}</span>
                                </div>
                            </div>
                            </br>
                            <div id="map" class="col-md-7 map" @mouseover="mapScroll" @mouseleave="enableScroll">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`,
    mounted() {

        this.map = new OpenLayers.Map( 'map');
        let layer = new OpenLayers.Layer.OSM( "Simple OSM Map");
        this.map.addLayers([layer, overlay]);
        this.map.setCenter(
            new OpenLayers.LonLat(19.833, 45.255).transform(
                new OpenLayers.Projection("EPSG:4326"),
                this.map.getProjectionObject()
            ), 12
        ); 

        axios.get('../rest/restaurants/managersRestaurant')
        .then(response => {
            this.restaurant = response.data;
            var myLocation = new OpenLayers.Geometry.Point(this.restaurant.location.latitude, this.restaurant.location.longitude)
                .transform('EPSG:4326', 'EPSG:3857');

            // We add the marker with a tooltip text to the overlay
            overlay.addFeatures([
                new OpenLayers.Feature.Vector(myLocation, {tooltip: 'OpenLayers'})
            ]);
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
        mapScroll: function(event){
            document.body.classList.add("stop-scrolling");
        },
        enableScroll: function(event){
            document.body.classList.remove("stop-scrolling");
        }
    }
});

