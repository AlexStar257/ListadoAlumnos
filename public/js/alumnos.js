"use strict";

// Declarar elementos del DOM
const form = document.querySelector("#form");
const btnAgregar = document.querySelector("#btnAgregar");
const btnConsultar = document.querySelector("#btnConsultar");

// Creacion de funciones necesarias
// Funcion para mostrar alertas al usuario
function showAlert(message, title) {
	const modalToggle = document.getElementById("alertModal");
	const myModal = new bootstrap.Modal("#alertModal", { keyboard: false });
	document.getElementById("alertTitle").innerHTML = title;
	document.getElementById("alertMessage").innerHTML = message;
	myModal.show(modalToggle);
}

// Obtener variables del formulario
const getInputs = () => {
	return {
		id: form['id'].value.trim(),
		matricula: form['matricula'].value.trim(),
		nombre: form['nombre'].value.trim(),
		domicilio: form['domicilio'].value.trim(),
		sexo: form['sexo'].value.trim(),
		especialidad: form['especialidad'].value.trim(),
	};
};

async function insertAlumno(event) {
	try {
		event.preventDefault();

		let { id, matricula, nombre, domicilio, sexo, especialidad } = getInputs();

		if (!matricula || !nombre || !domicilio || !sexo || !especialidad) return showAlert("Existen campos vacios", "Error");
		if (isNaN(parseFloat(id)) || parseFloat(id) <= 0) return showAlert("Introduzca valores validos", "Error");

		await axios.post('/add', {
			id,
			matricula,
			nombre,
			domicilio,
			sexo,
			especialidad,
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		});

		showAlert("Se insertaron con exito los datos", "Resultado");

		setTimeout(() => {
			window.location.href = '/';
		}, 2000);

	} catch (error) {
		// Captura de error y mandar retroalimentación al usuario
		console.log(error);
		showAlert(error.response.data, "Error");
	}
}

async function lookUpAlumno(event) {
	try {
		event.preventDefault();

		let alumno = getInputs();

		let nuevabusqueda = {};

		if (alumno.domicilio) {
			nuevabusqueda.domicilio = alumno.domicilio;
		}

		if (alumno.nombre) {
			nuevabusqueda.nombre = alumno.nombre;
		}

		if (alumno.matricula) {
			nuevabusqueda.matricula = alumno.matricula;
		}

		if (alumno.id) {
			if (isNaN(parseFloat(alumno.id)) || parseFloat(alumno.id) <= 0) return showAlert("Introduzca un precio valido", "Error");

			nuevabusqueda.id = alumno.id;
		}

		if (alumno.especialidad) {
			nuevabusqueda.especialidad = alumno.especialidad;
		}

		if (alumno.sexo) {
			nuevabusqueda.sexo = alumno.sexo;
		}

		await axios.post('/', nuevabusqueda, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		});

		window.location.pathname = window.location.pathname;
	} catch (error) {
		// Captura de error y mandar retroalimentación al usuario
		showAlert(error.response.data, "Error");
	}
}

btnAgregar.addEventListener("click", insertAlumno);
btnConsultar.addEventListener("click", lookUpAlumno);
form.addEventListener("reset", (event) => {
	event.preventDefault();

	window.location.pathname = window.location.pathname;
})