import EventListener from "./listener";

const EventSetting = {
  createMarkerEventSetting(
    map: naver.maps.Map,
    markerList: naver.maps.Marker[],
    polyline: naver.maps.Polyline
  ) {
    let marker = null;
    naver.maps.Event.addListener(map, 'click', function (e) {
      const coord = e.coord;
      polyline.getPath().push(coord);
      marker = new naver.maps.Marker({
        position: coord,
        clickable: true,
        map,
      });
      markerList.push(marker);
      naver.maps.Event.addListener(
        marker,
        'click',
        EventListener.markerRemoveOneClickEventListener(
          markerList,
          marker,
          polyline,
          coord,
        )
      );
    });
  },
  removeAllMarkerEventSetting(
    markerList: naver.maps.Marker[],
    polyline: naver.maps.Polyline
  ) {
    const markerRemoveButtonElement = document.getElementById(
      'marker-remove-all-btn'
    );
    markerRemoveButtonElement?.addEventListener(
      'click',
      EventListener.markerRemoveAllButtonEventListener.bind(
        null,
        markerList,
        polyline
      )
    );
  },
  exportFileEventSetting(markerList: naver.maps.Marker[]) {
    const markerExportAElement = document.getElementById('export-btn');
    markerExportAElement?.addEventListener(
      'click',
      EventListener.markerExportButtonEventListener.bind(null, markerList)
    );
  },
};

export default EventSetting
