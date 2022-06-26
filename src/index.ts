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

const EventListener = {
  markerRemoveOneClickEventListener(
    markerList: naver.maps.Marker[],
    marker: naver.maps.Marker | null,
    polyline: naver.maps.Polyline,
    coord: any
  ) {
    return (e: MouseEvent) => {
      marker?.setMap(null);
      markerList.splice(markerList.findIndex((m) => m === marker), 1)
      console.log('markerList', markerList)
      polyline.getPath().pop(coord);
    };
  },
  markerRemoveAllButtonEventListener(
    markerList: naver.maps.Marker[],
    polyline: naver.maps.Polyline,
    e: MouseEvent
  ) {
    markerList.forEach((m) => m.setMap(null));
    markerList.splice(0, markerList.length);
    console.log('markerList', markerList)
    polyline
      .getPath()
      .forEach((_: naver.maps.Polyline) => polyline.getPath().pop());
  },
  markerExportButtonEventListener(
    markerList: naver.maps.Marker[],
    e: MouseEvent
  ) {
    const markerExportAElement = document.getElementById('export-btn');
    markerExportAElement?.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' +
        encodeURIComponent(markerList.map((m) => m.getPosition()).join(' '))
    );
    markerExportAElement?.setAttribute('download', 'text');
    console.log(
      markerList.map((m) => m.getPosition()),
      'export'
    );
  },
};

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
