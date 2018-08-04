 var dmap ={
 	map:function (div,latlng,zoom){
 		return new google.maps.Map(document.getElementById(div), {
 			center:latlng,
 			zoom: zoom
 		});
 	},
 	mapCenter:function(map,latLng){
 		map.setCenter(latLng);
 	},
 	mark:function(map,myLatLng,title='',image=null){
 		return new google.maps.Marker({
 			position: myLatLng,
 			map: map,
 			title: title,
 			icon: image
 		});	
 	},
 	markRm:function(mark){
 		return mark.setMap(null);
 	},
 	info:function(mark,cb){
 		mark.addListener('click',cb);
 	},
 	polyline:function(flightPlanCoordinates,strokeColor='#FF0000',strokeOpacity=1.0,strokeWeight=2){
 		return  new google.maps.Polyline({
 			path: flightPlanCoordinates,
 			geodesic: true,
 			strokeColor: strokeColor,
 			strokeOpacity: strokeOpacity,
 			strokeWeight: strokeWeight
 		});
 	},
 	polyGon:function(triangleCoords,strokeColor='#FF0000',strokeOpacity=0.8, strokeWeight=2, fillColor='#FF0000', fillOpacity=0.35){
 		return  new google.maps.Polygon({
 			paths:paths,
 			strokeColor:strokeColor,
 			strokeOpacity:strokeOpacity,
 			strokeWeight:strokeWeight,
 			fillColor:fillColor,
 			fillOpacity:fillOpacity        });
 	}

 };

