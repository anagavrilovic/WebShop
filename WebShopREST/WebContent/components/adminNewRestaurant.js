var overlay = new OpenLayers.Layer.Vector('Overlay', {
    styleMap: new OpenLayers.StyleMap({
        externalGraphic: '../images/marker.png',
        graphicWidth: 20, graphicHeight: 24, graphicYOffset: -24,
        title: '${tooltip}'
    })
});

var map;
var currentLon;
var currentLat;

var currentFeature;
var previousFeature;

OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {                
    defaultHandlerOptions: {
        'single': true,
        'double': false,
        'pixelTolerance': 0,
        'stopSingle': false,
        'stopDouble': false
    },

    initialize: function(options) {
        this.handlerOptions = OpenLayers.Util.extend(
            {}, this.defaultHandlerOptions
        );
        OpenLayers.Control.prototype.initialize.apply(
            this, arguments
        ); 
        this.handler = new OpenLayers.Handler.Click(
            this, {
                'click': this.trigger
            }, this.handlerOptions
        );
    }, 

    trigger: function(e) {
        var toProjection = new OpenLayers.Projection("EPSG:4326");
        var position = map.getLonLatFromPixel(e.xy).transform(map.getProjectionObject(), toProjection);
        console.log(position);
        currentLat = position.lat;
        currentLon = position.lon;

        var myLocation = new OpenLayers.Geometry.Point(currentLon, currentLat)
        .transform('EPSG:4326', 'EPSG:3857');

        // We add the marker with a tooltip text to the overlay
        if(previousFeature != undefined){
            overlay.removeFeatures(previousFeature);
        }
        currentFeature = new OpenLayers.Feature.Vector(myLocation, {tooltip: 'OpenLayers'});
        overlay.addFeatures([
            currentFeature
        ]);
        previousFeature = currentFeature;
    }

});


Vue.component("admin-new-restaurant", {
    data: function() {
        return {
            searchParam: '',
            allManagers: null,
            managers: null,
            map: undefined,
            selectedManager: null,

            name: '',
            type: '',
            logoPath: '',
            imagePath: '',
            longitude: undefined,
            latitude: undefined,
            streetName: '',
            streetNumber: '',
            city: '',
            postalCode: '',
            managerUsername: '',
            
            selectedImageFile: '',
            selectedLogoFile: ''

        }
    },
    template:
        `
        <!-- Main body -->
        <div class="container">
            <div class="row">
                <div class="col-md-6"> 
                    <h1 style="margin-bottom:0vh; margin-top:10vh"> Novi restoran </h1>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6"> 
                   
                </div>
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-md-4"> 
                            <h5 style="margin-bottom:1vh; margin-top:10vh"> Označite lokaciju </h5> 
                        </div> 
                    </div>
                    
                </div>
                
            </div>

            <div class="row" style="margin-bottom:10vh">
                <div class="col-md-6"> 
                    <div class="row"> 
                        <div class="form-group input-field">
                            <input type="text" class="form-control input-field" placeholder="Naziv" required="required" v-model="name">
                        </div>
                    </div>
                    <div class="row"> 
                        <div class="form-group input-field">
                            <input type="text" class="form-control input-field" placeholder="Tip" required="required" v-model="type">
                        </div>
                    </div>
                    <div class="row">
                        <div> 
                            <label for="image-upload" class="btn btn-primary custom-file-upload">
                            Izaberite logo restorana
                            </label>
                            <input id="image-upload" type="file" v-on:change="logoPathChanged" accept="image/*" /> 
                            <input id="uploadImage" placeholder="File Name here" disabled="disabled" v-model="logoPath" class="input-field" style="width: 437px; height: 35px;"/>
                        </div>
                    </div>

                    <div class="row">
                        <div> 
                            <label for="logo-upload" class="btn btn-primary custom-file-upload">
                            Izaberite sliku restorana
                            </label>
                            <input id="logo-upload" type="file" v-on:change="imagePathChanged" accept="image/*" /> 
                            <input id="uploadLogo" placeholder="File Name here" disabled="disabled" v-model="imagePath" class="input-field" style="width: 437px; height: 35px;"/>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-8">
                            <div class="row"> 
                                <div class="form-group input-field">
                                    <input type="text" class="form-control input-field" placeholder="Grad" required="required" v-model="city">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="row"> 
                                <div class="form-group input-field">
                                    <input type="text" class="form-control input-field" placeholder="Poštanski broj" required="required" v-model="postalCode">
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="row">
                        <div class="col-md-8 pr-0">
                            <div class="row"> 
                                <div class="form-group input-field">
                                    <input type="text" class="form-control input-field" placeholder="Ulica" required="required" v-model="streetName">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="row"> 
                                <div class="form-group input-field">
                                    <input type="text" class="form-control input-field" placeholder="Broj" required="required" v-model="streetNumber">
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="col-md-6" id="map" style="min-height: 300px" @mouseover="mapScroll" @mouseleave="enableScroll" > 
                    
                </div>

                <div class="row">
                    <div class="col-md-6"></div>
                    <div class="col-md-2">
                        <input type="text" style="margin-bottom:2vh; margin-top:2vh" class="form-control input-field" placeholder="Geografska širina" required="required" v-model="latitude">
                    </div>
                    <div class="col-md-2">
                        <input type="text" style="margin-bottom:2vh; margin-top:2vh" class="form-control input-field" placeholder="Geografska dužina" required="required" v-model="longitude">
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-success" style="margin-top:2vh" v-on:click="refreshCoordinates"> Generiši koordinate </button>
                    </div>
                </div>                
                
            </div>

            <div class="row">
                <div class="row">
                    <div class="col-md-6"> 
                        <h5> Odaberite menadzera </h5>
                    </div> 

                    <div class="col-md-6"> 
                        <div class="input-group rounded">
                            <input type="search" class="form-control rounded search-bar" placeholder="Search" aria-label="Search"
                                v-model="searchParam" @keyup="search"/>
                            <span class="input-group-text border-0" id="search-addon">
                                <i class="fa fa-search"></i>
                            </span>
                        </div>
                    </div> 
                </div>

                <div class="row" >
                    <div class="col-md-12"> 
                        
                        <table class="table table-striped table-bordered table-hover" style="margin-bottom: 10px">
                            <thead>
                            <tr>
                                <th scope="col">Ime</th>
                                <th scope="col">Prezime</th>
                                <th scope="col">Datum rođenja</th>
                                <th scope="col">Korisničko ime</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="m in managers" @click="selectManager(m)"
                                v-bind:class="{selected : selectedManager == m}">
                                <td scope="row">{{m.firstName}}</td>
                                <td>{{m.lastName}}</td>
                                <td>{{m.dateOfBirth | dateFormat('DD.MM.YYYY.')}}</td>
                                <td>{{m.username}}</td>
                            </tr>
                            
                            </tbody>
                        </table>

                    </div> 
                </div>

                <div class="row">
                    <div class="col-md-4"> 
                        <p> Odabrani menadzer: 
                            <span v-if="selectedManager !== null">
                                {{selectedManager.firstName}} {{selectedManager.lastName}}
                            </span>
                        </p>
                    </div> 
                    <div class="col-md-4"> </div>
                    <div class="col-md-4"> 
                        <a href="#" style="float: right"> Ili dodajte novog menadžera? </a>
                    </div> 
                </div>

                <div class="row justify-content-center">
                    <div class="col-md-4" style="margin-bottom:30px"> 
                        <button class="btn btn-primary" style="width: 100px; margin-right:20px; margin-top:30px" v-on:click="createRestaurant"> Potvrdi </button>
                        <button class="btn btn-primary" style="width: 100px; margin-right:20px; margin-top:30px"> Odustani </button>
                    </div> 
                </div>

            </div>

        </div>
		`,
    mounted() {
        map = new OpenLayers.Map( 'map');
        let layer = new OpenLayers.Layer.OSM( "Simple OSM Map");
        map.addLayers([layer, overlay]);
        map.setCenter(
            new OpenLayers.LonLat(19.833, 45.255).transform(
                new OpenLayers.Projection("EPSG:4326"),
                map.getProjectionObject()
            ), 12
        ); 

        var click = new OpenLayers.Control.Click();
        map.addControl(click);
        click.activate();

        axios.get('../rest/users/freeManagers')
        .then(response => {
            this.allManagers = response.data;
            this.managers = this.allManagers.slice();
        });
    },
    methods: {
        imagePathChanged: function (e) {
            var files = e.target.files || e.dataTransfer.files;
            try{
                this.imagePath = files[0].name;
                console.log(files[0]);
                this.selectedImageFile = files[0];
            

            }
            catch(err){
                this.imagePath = 'Error loading image';
            }
        },

        logoPathChanged: function (e) {
            var files = e.target.files || e.dataTransfer.files;
            try{
                this.logoPath = files[0].name;
                console.log(files[0]);
                this.selectedLogoFile = files[0];

            }
            catch(err){
                this.logoPath = 'Error loading image';
            }
        },

        selectManager: function(manager) {
            this.selectedManager = manager;
        },

        mapScroll: function(event){
            document.body.classList.add("stop-scrolling");
        },
        enableScroll: function(event){
            document.body.classList.remove("stop-scrolling");
        },
        refreshCoordinates: function(event){
            this.latitude = currentLat;
            this.longitude = currentLon;
            console.log('Klik:');
            console.log(this.latitude);
            console.log(this.longitude);
        },
        getBase64: function(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        },
        createRestaurant: function(){
            let restaurant = {
                name: this.name, 
                type: this.type, 
                logoPath: '../images/' + this.logoPath,
                imagePath: '../images/' + this.imagePath,
                longitude: this.longitude,
                latitude: this.latitude,
                streetName: this.streetName,
                streetNumber: this.streetNumber,
                city: this.city,
                postalCode: this.postalCode,
                managerUsername: this.selectedManager.username
            }
            axios.post('../rest/restaurants/addNewRestaurant', restaurant)
                .then(response => {
                    console.log(response.data);
                    this.getBase64(this.selectedImageFile).then(
                        data => {
                          axios.post('../rest/restaurants/uploadImage', {data64: data, fileName: this.imagePath})
                            .then(response => console.log(response.data));
                        }
                    );
                    this.getBase64(this.selectedLogoFile).then(
                        data => {
                            axios.post('../rest/restaurants/uploadImage', {data64: data, fileName: this.logoPath})
                            .then(response => console.log(response.data));
                        }
                    );
                })
        },

        search: function() {
            while(this.managers.length)
                this.managers.pop();

            let searchParams = this.searchParam.split(' ');
            for(let manager of this.allManagers) {
                let result = true;

                for(let s of searchParams) {
                    if(!manager.firstName.toLowerCase().includes(s.toLowerCase()) &&
                        !manager.lastName.toLowerCase().includes(s.toLowerCase()) &&
                        !manager.username.toLowerCase().includes(s.toLowerCase())) {
                            result = false;
                            break;
                        }
                }

                if(result)
                    this.managers.push(manager);
                
            }
        }
    },
    filters: {
        dateFormat: function(value, format) {
            var parsed = moment(value);
            return parsed.format(format);
        }
    }
})