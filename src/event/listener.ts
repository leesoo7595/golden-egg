const EventListener = {
  markerRemoveOneClickEventListener(
    markerList: naver.maps.Marker[],
    marker: naver.maps.Marker | null,
    polyline: naver.maps.Polyline,
    coord: any
  ) {
    return (e: MouseEvent) => {
      marker?.setMap(null);
      console.log(e);
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

export default EventListener