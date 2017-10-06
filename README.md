CartoDB.js mini library
=======================

Mini version of [original](https://github.com/CartoDB/cartodb.js) CartoDB javascript library for maps/custom tiles rendering.

---

## Installation

1. Import [cartodb-mini.js](libs/cartodb-mini.js)
2. Write map config in a variable (look at example in [mapConfig.js](data/mapConfig.js))
3. Load the map:
    ```
    CDB.loadMapConfig(divId, mapCfgVar);
    ```

**Note**: Map config is actually included as variable for faster tests (without a web-server). It should be easy to turn it in async request to load external config files.

## Description

The library uses [Leaflet](http://leafletjs.com/) library for tiles rendering and [CartoDB Maps API](https://carto.com/docs/carto-engine/maps-api) for layers URLs provisioning.
It will read map config file looking for map center/zoom attributes, and will set the view in specified container. Then will cycle on layers configuration to produce payload for request to CartoDB Maps API. Finally it will load layers using response (`layergroupid`) from CartoDB Maps API.

## Checklist

- [x] Render maps reading from config files
- [ ] Expose API to show/hide any layer
- [ ] Expose API to update SQL attribute of CartoDB layers