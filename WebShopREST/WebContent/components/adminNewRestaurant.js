var map;
var currentLon;
var currentLat;
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
    }

});


Vue.component("admin-new-restaurant", {
    data: function() {
        return {
            imagePath: '',
            managers: [
                {name: 'Slavko',  surname: 'Slavković', dateOfBirth: '11.02.1990', username: 'slavko_car', restaurant: 'Mali Balkan'},
                {name: 'Branko',  surname: 'Branković',  dateOfBirth: '21.02.1980', username: 'branko_brat', restaurant: 'Mali Anagram'},
                {name: 'Smiljka',  surname: 'Smiljković', dateOfBirth: '16.02.1973', username: 'smiljka_hraniteljka', restaurant: 'Mali Slavko'},
                {name: 'Gavrilo',  surname: 'Gavrić', dateOfBirth: '11.02.1965', username: 'gavrilo_princip', restaurant: 'Mali Milojica'}
            ],
            map: undefined
        }
    },
    template:
        `
        <!-- Main body -->
        <div class="container">
            <div class="row">
                <h2 style="margin-bottom:5vh; margin-top:10vh"> Novi restoran </h2>
            </div>

            <div class="row" style="margin-bottom:10vh">
                <div class="col-md-6"> 
                    <div class="row"> 
                        <div class="form-group input-field">
                            <input type="text" class="form-control input-field" placeholder="Naziv" required="required">
                        </div>
                    </div>
                    <div class="row"> 
                        <div class="form-group input-field">
                            <input type="text" class="form-control input-field" placeholder="Tip" required="required">
                        </div>
                    </div>
                    <div class="row">
                        <div> 
                            <label for="file-upload" class="btn btn-primary custom-file-upload">
                            Izaberite logo restorana
                            </label>
                            <input id="file-upload" type="file" v-on:change="imagePathChanged" accept="image/*" /> 
                            <input id="uploadFile" placeholder="File Name here" disabled="disabled" v-model="imagePath" class="input-field" style="width: 437px; height: 35px;"/>
                        </div>
                    </div>

                    <div class="row">
                        <div> 
                            <label for="file-upload" class="btn btn-primary custom-file-upload">
                            Izaberite sliku restorana
                            </label>
                            <input id="file-upload" type="file" v-on:change="imagePathChanged" accept="image/*" /> 
                            <input id="uploadFile" placeholder="File Name here" disabled="disabled" v-model="imagePath" class="input-field" style="width: 437px; height: 35px;"/>
                        </div>
                    </div>

                </div>

                <div class="col-md-6" id="map" style="min-height: 300px" @mouseover="mapScroll" @mouseleave="enableScroll"> 
                    
                </div>                
                
            </div>

            <div class="row">
                <div class="row">
                    <div class="col-md-6"> 
                        <h5> Odaberite menadzera </h5>
                    </div> 

                    <div class="col-md-6"> 
                        <div class="input-group rounded">
                            <input type="search" class="form-control rounded search-bar" placeholder="Search" aria-label="Search"/>
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
                                <th scope="col">Restoran</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="m in managers">
                                <td scope="row">{{m.name}}</td>
                                <td>{{m.surname}}</td>
                                <td>{{m.dateOfBirth}}</td>
                                <td>{{m.username}}</td>
                                <td>{{m.restaurant}}</td>
                            </tr>
                            
                            </tbody>
                        </table>

                    </div> 
                </div>

                <div class="row">
                    <div class="col-md-4"> 
                        <p> Odabrani menadzer: </p>
                    </div> 
                    <div class="col-md-4"> </div>
                    <div class="col-md-4"> 
                        <a href="#" style="float: right"> Ili dodajte novog menadžera? </a>
                    </div> 
                </div>

                <div class="row justify-content-center">
                    <div class="col-md-4" style="margin-bottom:30px"> 
                        <button class="btn btn-primary" style="width: 100px; margin-right:20px; margin-top:30px"> Potvrdi </button>
                        <button class="btn btn-primary" style="width: 100px; margin-right:20px; margin-top:30px"> Odustani </button>
                    </div> 
                </div>

            </div>

        </div>
		`,
    mounted() {
        /*this.map = new OpenLayers.Map({
            target: 'map',
            layers: [
              new OpenLayers.layer.Tile({
                source: new OpenLayers.source.OSM()
              })
            ],
            view: new OpenLayers.View({
              center: OpenLayers.proj.fromLonLat([20.46,44.80]),
              zoom: 10
            })
          });*/
          map = new OpenLayers.Map( 'map');
            let layer = new OpenLayers.Layer.OSM( "Simple OSM Map");
            map.addLayer(layer);
            map.setCenter(
                new OpenLayers.LonLat(19.833, 45.255).transform(
                    new OpenLayers.Projection("EPSG:4326"),
                    map.getProjectionObject()
                ), 12
            ); 


            var click = new OpenLayers.Control.Click();
            map.addControl(click);
            click.activate();
    },
    methods: {
        imagePathChanged: function (e) {
            var files = e.target.files || e.dataTransfer.files;
            try{
                this.imagePath = files[0].name;
            }
            catch(err){
                this.imagePath = 'Error loading image';
            }
        },
        mapScroll: function(event){
            document.body.classList.add("stop-scrolling");
        },
        enableScroll: function(event){
            document.body.classList.remove("stop-scrolling");
        }
    }
})