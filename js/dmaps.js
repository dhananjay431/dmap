 this.dmap={} || [];
 (function(dmap){

   dmap.map=function (div,latlng,zoom){
    return new google.maps.Map(document.getElementById(div), {
        center:latlng,
        zoom: zoom
    });
},
dmap.mapCenter=function(map,latLng){
    map.setCenter(latLng);
};
dmap.mark=function(map,myLatLng,title='',image=null){
    return new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: title,
        icon: image
    }); 
};
dmap.markRm=function(mark){
    return mark.setMap(null);
};
dmap.info=function(mark,cb){
    mark.addListener('click',cb);
};
dmap.polyline=function(flightPlanCoordinates,strokeColor='#FF0000',strokeOpacity=1.0,strokeWeight=2){
    return  new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: strokeColor,
        strokeOpacity: strokeOpacity,
        strokeWeight: strokeWeight
    });
};
dmap.polyGon=function(triangleCoords,strokeColor='#FF0000',strokeOpacity=0.8, strokeWeight=2, fillColor='#FF0000', fillOpacity=0.35){
    return  new google.maps.Polygon({
        paths:paths,
        strokeColor:strokeColor,
        strokeOpacity:strokeOpacity,
        strokeWeight:strokeWeight,
        fillColor:fillColor,
        fillOpacity:fillOpacity        });
};
dmap.getDistance=function(p1, p2) {
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
return dmap;
})(this.dmap);

