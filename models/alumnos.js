const json = require("express/lib/response");
const resolve = require("path/posix");
const promise = require('../models/conexion');
const conexion = require('../models/conexion');

const dbAlumno = {
    insertar(alumno) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO alumno SET ?";
            conexion.query(query, alumno, (err, res) => {
                if (err) {
                    console.log("Surgio un error " + err.message);
                    reject(err);
                } else {
                    resolve({
                        id: res.id,
                        matricula: alumno.matricula,
                        nombre: alumno.nombre,
                        domicilio: alumno.domicilio,
                        sexo: alumno.sexo,
                        especialidad: alumno.especialidad
                    })
                }
            });
        });
    },

    mostrarTodos() {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM alumno";

            conexion.query(query, null, (err, res) => {
                if (err) {
                    console.log("Surgio un error" + err.message);
                    reject(err);
                } else {
                    resolve(res)
                    return res;
                }

            })
        })
    },

    buscarPorId(matricula) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM alumno WHERE id = ?";
            conexion.query(query, [matricula], (err, res) => {
                if (err) {
                    console.log("Surgio un error " + err.message);
                    reject(err);
                } else {
                    resolve(res);
                    return res;
                }
            });
        })
    },

    ejecutarConsulta(consulta) {
        return new Promise((resolve, reject) => {
            conexion.query(consulta, null, (err, res) => {
                if (err) {
                    console.log("Surgio un error " + err.message);
                    reject(err);
                } else {
                    resolve(res);
                    return res;
                }
            });
        })
    },

    borrar(id) {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM alumno where id = ?";
            conexion.query(query, [id], (err, res) => {
                if (err) {
                    console.log("Sucedio un error" + err.message);
                    reject(err)
                } else {
                    resolve(res);
                }
            })
        })
    },

    actualizar(id, alumno) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE alumno SET ? WHERE id = ?";
            conexion.query(query, [alumno, id], (err, res) => {
                if (err) {
                    console.log("Sucedio un error" + err.message);
                    reject(err)
                } else {
                    resolve(res.json);
                }
            })
        })
    }
};

module.exports = {
    dbAlumno
}