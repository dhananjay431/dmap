this.dmap = {} || [];
(function (dmap) {

    dmap.map = function (div, latlng, zoom) {
        return new google.maps.Map(document.getElementById(div), {
            center: latlng,
            zoom: zoom
        });
    },
        dmap.mapCenter = function (map, latLng) {
            map.setCenter(latLng);
        };
    dmap.mark = function (map, myLatLng, title = '', image = null) {
        return new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: title,
            icon: image
        });
    };
    dmap.markRm = function (mark) {
        return mark.setMap(null);
    };
    dmap.info = function (mark, cb) {
        mark.addListener('click', cb);
    };
    dmap.polyline = function (flightPlanCoordinates, strokeColor = '#FF0000', strokeOpacity = 1.0, strokeWeight = 2) {
        return new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: strokeColor,
            strokeOpacity: strokeOpacity,
            strokeWeight: strokeWeight
        });
    };
    dmap.polyGon = function (triangleCoords, strokeColor = '#FF0000', strokeOpacity = 0.8, strokeWeight = 2, fillColor = '#FF0000', fillOpacity = 0.35) {
        return new google.maps.Polygon({
            paths: paths,
            strokeColor: strokeColor,
            strokeOpacity: strokeOpacity,
            strokeWeight: strokeWeight,
            fillColor: fillColor,
            fillOpacity: fillOpacity
        });
    };
    dmap.getDistance = function (p1, p2) {
        var R = 6378137; // Earth’s mean radius in meter
        var dLat = (p2.lat - p1.lat) * Math.PI / 180;
        var dLong = (p2.lng - p1.lng) * Math.PI / 180
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((p1.lat) * Math.PI / 180) * Math.cos((p2.lat) * Math.PI / 180) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d / 1000; // returns the distance in meter
    };
    dmap.flag = 'init';

    dmap.play = function (map, mark, icons, coords, km_h = 50) {
        // this.playing=!this.playing;
        if (dmap.flag == 'init') {
            dmap.animateMarker(map, mark, icons, coords);
            dmap.flag = 'stop';

        } else
            if (dmap.flag == 'start') {
                dmap._moveMarker();
                dmap.flag = 'stop';
            } else
                if (dmap.flag == 'stop') {
                    //  dmap.speed = 0;
                    clearTimeout(this.start);
                    dmap.flag = 'start';
                }
        if (dmap.flag == 'reset') {
            mark.setPosition({ lat: coords[0].lat, lng: coords[0].lng });
            dmap.flag = 'init';
        }
        return dmap.flag;
    };
    dmap.show = function () { console.log("show"); }
    dmap.init = function () {
        dmap.show();
    }
    dmap._goToPoint; dmap._moveMarker;
    dmap.speed = 50;
    dmap.delay = 100;
    dmap.marker;
    dmap.speedInc = function (speed) {
        dmap.speed += speed;
        console.log(dmap.speed);
    }
    dmap.animateMarker = function (map, mark, icons, coords) {
        var target = 0;
        // dmap.marker = new google.maps.Marker({
        //     position: {lat:coords[0].lat,lng:coords[0].lng},
        //     map: map,
        //     icon: icons.car
        // });
        //       coords.push({lat:coords[coords.length-1].lat,lng:coords[coords.length-1].lng});
        dmap._goToPoint = function () {
            // dmap.speed = km_h;
            var lat = mark.position.lat();
            var lng = mark.position.lng();
            var step = (dmap.speed * 1000 * dmap.delay) / 3600000; // in meters
            var dest = new google.maps.LatLng(coords[target].lat, coords[target].lng);
            var distance = google.maps.geometry.spherical.computeDistanceBetween(dest, mark.position); // in meters
            var numStep = distance / step;
            var i = 0;
            var deltaLat = (coords[target].lat - lat) / numStep;
            var deltaLng = (coords[target].lng - lng) / numStep;
            // that.speedmeterVal= that.mapData1[target]?(that.mapData1[target][2] + "Kmph"):0;
            //    console.log('veh speed',that.speedmeterVal)
            dmap._moveMarker = function () {
                lat += deltaLat;
                lng += deltaLng;
                i += step;
                if (i < distance) {
                    var head = google.maps.geometry.spherical.computeHeading(mark.getPosition(), new google.maps.LatLng(lat, lng))
                    if ((head != 0) || (head == NaN)) {
                        icons.car.rotation = head
                    }
                    mark.setIcon(icons.car);
                    mark.setPosition(new google.maps.LatLng(lat, lng));
                    map.setCenter({ lat: lat, lng: lng });
                    dmap.start = setTimeout(dmap._moveMarker, dmap.delay);
                }
                else {
                    var head = google.maps.geometry.spherical.computeHeading(mark.getPosition(), new google.maps.LatLng(lat, lng));
                    if ((head != 0) || (head == NaN)) {
                        icons.car.rotation = head
                    }
                    mark.setIcon(icons.car);
                    mark.setPosition(dest);
                    map.setCenter({ lat: lat, lng: lng });
                    target++;
                    if (target == coords.length) {
                        // target = 0;
                        dmap.flag = 'reset';
                        clearTimeout(dmap.start);
                    }

                    dmap.start = setTimeout(dmap._goToPoint, dmap.delay);
                }
            }
            dmap._moveMarker();
        }
        dmap._goToPoint();
    }
    return dmap;
})(this.dmap);