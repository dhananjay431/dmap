(function(dmap){
  dmap.Dmap = function(id,data){ this.map =  new google.maps.Map(document.getElementById(id),data); }
  dmap.Dmap.prototype.polyline =function(data){
    return  new google.maps.Polyline(data);
  }
  dmap.Dmap.prototype.setMap =function(data1,data2){
    data1.setMap(data2);
  }
  dmap.Dmap.prototype.mark = function(data){
    data.map = this.map;
    return new google.maps.Marker(data);
  }
  dmap.Dmap.prototype.action =function(event,cb){
          google.maps.event.addListener(this.map,event,cb);
  }
  dmap.Dmap.prototype.info= function(marker,event,contentString){
        marker.addListener(event, function() {
          new google.maps.InfoWindow({
          content: contentString
        }).open(this.map, marker);
        });
  }
})(this)