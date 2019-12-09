"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Sirve para manejar los marcadores y la informacion del mapa
class Mapa {
    constructor() {
        //Va a tener un objeto que sus propiedades va hacer del
        //tipo marcador
        this.marcadores = {
            //ASi se crea la estructura de la cual nos referiremos a cada obj con el key y o ID
            '1': {
                id: '1',
                nombre: 'Fernando',
                lng: -75.75512993582937,
                lat: 45.349977429009954,
                color: '#dd8fee'
            },
            '2': {
                id: '2',
                nombre: 'Amy',
                lng: -75.75195645527508,
                lat: 45.351584045823756,
                color: '#790af0'
            },
            '3': {
                id: '3',
                nombre: 'Orlando',
                lng: -75.75900589557777,
                lat: 45.34794635758547,
                color: '#19884b'
            }
        };
    }
    agregarMarcador(marcador) {
        this.marcadores[marcador.id] = marcador;
    }
    getMarcadores() {
        return this.marcadores;
    }
    borrarMarcador(id) {
        //Asi borramos lo que tenga la propiedad id del marcador
        delete this.marcadores[id];
        return this.getMarcadores();
    }
    //Asi actualizamos progresivamente las coordenadas del
    //marcador que estemos enviando del arreglo de marcadores
    moverMarcador(marcador) {
        //Modificamos directamente la propiedad .lng del marcador
        this.marcadores[marcador.id].lng = marcador.lng;
        this.marcadores[marcador.id].lat = marcador.lat;
    }
}
exports.Mapa = Mapa;
