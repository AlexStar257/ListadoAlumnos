const express = require("express");
const router = express.Router();
const db = require("../models/alumnos.js");
const escape = require("mysql2").escape;
let counter = 0;
let query = "SELECT * FROM alumno";

// Administración Alumnos
router.get("/", async (req, res) => {
	try {
		if (counter === 0) {
			query = "SELECT * FROM alumno";
		}

		const rows = await db.dbAlumno.ejecutarConsulta(query);
		counter -= 1;

		res.render("index.html", {
			title: "Listado de Alumnos",
			alumnos: rows,
			navLinks: [
				{ class: "nav-link active", link: "/", title: "Inicio" },
			],
			scripts: [
				"https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js",
				"/js/bootstrap.bundle.min.js",
				"/js/alumnos.js"
			]
		});
	} catch (error) {
		console.log(error);
	}
});

router.post("/", async (req, res) => {
	try {
		let searchAlumno = req.body;

		if (Object.keys(searchAlumno).length === 0) {
			return res.status(400).send("Añade contenido a la consulta");
		}

		counter = 2;
		query = "SELECT * FROM alumno WHERE ";

		let i = 0;
		for (const [key, value] of Object.entries(searchAlumno)) {
			if (i === Object.keys(searchAlumno).length - 1) {
				query += `alumno.${key} LIKE ${escape("%" + value + "%")}`;
			} else {
				query += `alumno.${key} LIKE ${escape("%" + value + "%")} AND `;
			}

			i++;
		}

		return res.redirect("/");
	} catch (error) {
		console.log(error);
	}
});

router.post("/add", async (req, res) => {
	try {
		const newAlumno = {	// Creación del objeto usado para realizar la inserción
			id: req.body.id,
			matricula: req.body.matricula,
			nombre: req.body.nombre,
			domicilio: req.body.domicilio,
			sexo: req.body.sexo,
			especialidad: req.body.especialidad
		}

		await db.dbAlumno.insertar(newAlumno);
		return res.status(200).send("Se insertaron con exito los datos");
	} catch (error) {
		console.log(error.message);
		return res.status(400).send("Sucedio un error");
	}
});

router.get("/update/:id", async (req, res) => {
	try {
		const { id } = req.params;	//obtención del id

		let [alumno] = await db.dbAlumno.buscarPorId(id);

		res.render("editAlumno.html", {
			title: "Editar Alumno",
			alumno,
			navLinks: [
				{ class: "nav-link active", link: "/", title: "Inicio" },
			],
			scripts: [
				"https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js",
				"/js/bootstrap.bundle.min.js",
				"/js/edit-alumno.js"
			]
		});
	} catch (error) {
		console.log(error);
	}
});

router.post("/update/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const editAlumno = {
			matricula: req.body.matricula,
			nombre: req.body.nombre,
			domicilio: req.body.domicilio,
			sexo: req.body.sexo,
			especialidad: req.body.especialidad
		}

		await db.dbAlumno.actualizar(id, editAlumno);
		return res.redirect("/");

	} catch (error) {
		console.log(error);
		return res.status(400).send("Sucedio un error");
	}
});

router.get("/delete/:id", async (req, res) => {
	try {
		const { id } = req.params;

		await db.dbAlumno.borrar(id);

		res.redirect("/");
	} catch (error) {
		console.log(error);
	}
});

// La pagina del error va al final de los get/post
router.use((req, res, next) => {
	res.status(404).render("error.html", {
		title: "Pagina no encontrada",
		navLinks: [
			{ class: "nav-link active", link: "/", title: "Inicio" },
		],
		scripts: [
			"/js/bootstrap.bundle.min.js",
		]
	});
});

module.exports = router;
