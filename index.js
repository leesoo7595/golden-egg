"use strict";
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded');
    const map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(37.511337, 127.012084),
        zoom: 13,
    });
    let markerList = [];
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
    markerRemoveOneClickEventListener(markerList, marker, polyline, coord) {
        return (e) => {
            marker === null || marker === void 0 ? void 0 : marker.setMap(null);
            markerList = [...markerList.filter((m) => m !== marker)];
            polyline.getPath().pop(coord);
        };
    },
    markerRemoveAllButtonEventListener(markerList, polyline, e) {
        markerList.forEach((m) => m.setMap(null));
        polyline
            .getPath()
            .forEach((_) => polyline.getPath().pop());
    },
    markerExportButtonEventListener(markerList, e) {
        const markerExportAElement = document.getElementById('export-btn');
        markerExportAElement === null || markerExportAElement === void 0 ? void 0 : markerExportAElement.setAttribute('href', 'data:text/plain;charset=utf-8,' +
            encodeURIComponent(markerList.map((m) => m.getPosition()).join(' ')));
        markerExportAElement === null || markerExportAElement === void 0 ? void 0 : markerExportAElement.setAttribute('download', 'text');
        console.log(markerList.map((m) => m.getPosition()), 'export');
    },
};
const EventSetting = {
    createMarkerEventSetting(map, markerList, polyline) {
        let marker = null;
        naver.maps.Event.addListener(map, 'click', function (e) {
            const coord = e.coord;
            polyline.getPath().push(coord);
            console.log('polyline', polyline);
            marker = new naver.maps.Marker({
                position: coord,
                clickable: true,
                map,
            });
            markerList.push(marker);
            naver.maps.Event.addListener(marker, 'click', EventListener.markerRemoveOneClickEventListener(markerList, marker, polyline, coord));
        });
    },
    removeAllMarkerEventSetting(markerList, polyline) {
        const markerRemoveButtonElement = document.getElementById('marker-remove-all-btn');
        markerRemoveButtonElement === null || markerRemoveButtonElement === void 0 ? void 0 : markerRemoveButtonElement.addEventListener('click', EventListener.markerRemoveAllButtonEventListener.bind(null, markerList, polyline));
    },
    exportFileEventSetting(markerList) {
        const markerExportAElement = document.getElementById('export-btn');
        markerExportAElement === null || markerExportAElement === void 0 ? void 0 : markerExportAElement.addEventListener('click', EventListener.markerExportButtonEventListener.bind(null, markerList));
    },
};
