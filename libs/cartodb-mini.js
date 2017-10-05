/**
 * CartoDBMini.js
 * 
 * Mini library to load maps using Leaflet,
 * with map config as parameter.
 * It uses Carto Maps API to generate tiles,
 * loading them into given div.
 */
window.CDB = {

    // Maps loading method
    loadMapConfig: function(div, cfg) {
        var center  = JSON.parse(cfg.center),
            zoom    = cfg.zoom,
            mapUser = cfg.maps_api_config.user_name,
            layers  = cfg.layers,
            map,
            cfgPayload;

        // Instantiate map into div
        map = L.map(div).setView(center, zoom);

        // Initialize payload structure
        cfgPayload = {
            layers: []
        };

        // Cycle over layers to build payload
        for (var i = 0; i < layers.length; i++) {
            switch (layers[i].type.toLowerCase()) {
                case "mapnik":
                case "cartodb":
                    cfgPayload.layers[i] = {
                        type: "mapnik",
                        options: layers[i].options
                    };
                    break;
                case "tiled":
                    cfgPayload.layers[i] = {
                        type: "http",
                        options: {
                            urlTemplate: layers[i].options.urlTemplate
                        }
                    };
                    break;
            }
        }

        // POST request to Maps API using payload
        $.ajax({
            method: "POST",
            url: "http://documentation.cartodb.com/api/v1/map",
            dataType: "json",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            data: JSON.stringify(cfgPayload)
        })
        .done(function(data) {

            // Cycle again over layers to load them into map instance
            // (it's important to load also base/overlays layers 
            // through Maps API to preserve layers sorting)
            for (var i = 0; i < layers.length; i++) {
                L.tileLayer('http://ashbu.cartocdn.com/' +
                   mapUser + 
                   '/api/v1/map/' +
                   data.layergroupid + '/' + i +
                   '/{z}/{x}/{y}.png')
                .addTo(map);
            }
        })
        .fail(function(xhr, status, err) {
            console.log(err);
        });
    }
};