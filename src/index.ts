import EventSetting from './event/setting'

window.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded');
  const map = new naver.maps.Map('map', {
    center: new naver.maps.LatLng(37.511337, 127.012084),
    zoom: 13,
  });
  let markerList: naver.maps.Marker[] = []
  let polyline = new naver.maps.Polyline({
    map,
    path: [],
    strokeColor: '#5347AA',
    strokeWeight: 2,
  });
  EventSetting.createMarkerEventSetting(map, markerList, polyline);
  EventSetting.removeAllMarkerEventSetting(markerList, polyline);
  EventSetting.exportFileEventSetting(markerList);
});
