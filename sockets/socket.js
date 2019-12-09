"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usuarios_lista_1 = require("../classes/usuarios-lista");
const usuario_1 = require("../classes/usuario");
const mapa_1 = require("../classes/mapa");
exports.mapa = new mapa_1.Mapa();
exports.usuariosConectados = new usuarios_lista_1.UsuariosLista();
//Eventos de mapa
//EL cliente es la instancia de la app y el io es el server de express
exports.mapaSockets = (cliente, io) => {
    //Este escucha el evento
    cliente.on('marcador-nuevo', (marcador) => {
        exports.mapa.agregarMarcador(marcador);
        //el nombre del evento es diferente uno emite y otro escucha
        cliente.broadcast.emit('marcador-nuevo', marcador);
    });
    cliente.on('marcador-borrar', (id) => {
        //Los datos pueden estar en un BD, este ejemplo simula la estructura
        exports.mapa.borrarMarcador(id);
        //De esta forma emitimos un evento para todos menos quien la mando
        cliente.broadcast.emit('marcador-borrar', id);
    });
    cliente.on('marcador-mover', (marcador) => {
        //Asi movemos el marcador
        exports.mapa.moverMarcador(marcador);
        //De esta forma emitimos un evento para todos menos quien la mando
        cliente.broadcast.emit('marcador-mover', marcador);
    });
};
exports.conectarCliente = (cliente, io) => {
    const usuario = new usuario_1.Usuario(cliente.id);
    exports.usuariosConectados.agregar(usuario);
};
exports.desconectar = (cliente, io) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
        exports.usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
    });
};
// Escuchar mensajes
exports.mensaje = (cliente, io) => {
    cliente.on('mensaje', (payload) => {
        console.log('Mensaje recibido', payload);
        io.emit('mensaje-nuevo', payload);
    });
};
// Configurar usuario
exports.configurarUsuario = (cliente, io) => {
    cliente.on('configurar-usuario', (payload, callback) => {
        exports.usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        });
    });
};
// Obtener Usuarios
exports.obtenerUsuarios = (cliente, io) => {
    cliente.on('obtener-usuarios', () => {
        io.to(cliente.id).emit('usuarios-activos', exports.usuariosConectados.getLista());
    });
};
