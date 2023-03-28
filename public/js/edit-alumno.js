"use strict";

// Declarar elementos del DOM
const form = document.querySelector("#form");
const btnActualizar = document.querySelector("#btnActualizar");

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

async function updateAlumno(event) {
	try {
		event.preventDefault();

		// Llamada a funcion para obtener datos del formulario
		let { matricula, nombre, domicilio, sexo, especialidad } = getInputs();

		// Validación de campos
		if (!matricula || !nombre || !domicilio || !sexo || !especialidad) return showAlert("Existen campos vacios", "Error");

		// Creación de objeto a mandar petición
		let alumnoModificado = {
			matricula,
			nombre,
			domicilio,
			sexo,
			especialidad,
		}

		// Petición de actualizacion de registro sin imagen
		await axios.post(window.location.pathname, alumnoModificado, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		});

		showAlert("Se actualizó el registro con exito", "Resultado");

		setTimeout(() => {
			window.location.href = '/';
		}, 2000);

	} catch (error) {
		// Captura de error y mandar retroalimentación al usuario
		showAlert(error.response.data, "Error");
	}
}

// Creacion de escuchadores de eventos
btnActualizar.addEventListener("click", updateAlumno)
form.addEventListener("reset", (event) => {
	document.querySelector("#imgPreview").src = ulrImagenDefault;
})