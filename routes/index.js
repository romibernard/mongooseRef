const express = require("express");
const Album = require("../models/Album");
const router = express.Router();
const Artist = require("../models/Artist");

/* GET home page */
router.get("/", async (req, res, next) => {
  const artists = await Artist.find();
  res.render("index", { artists });
});

//rute para mostrar el dormulario
router.get("/artist/create", (req, res) => {
  res.render("artist/create");
});

// //ruta para obtener la info del formulario
// router.post("/artist/create", (req, res) => {
//   // res.send(req.body);
//   const { name, genre, country } = req.body;
//   Artist.create({ name, genre, country })
//     .then(res.redirect("/"))
//     .catch((e) => {
//       console.log(e);
//     });
// });

//VERSION CON ASYNC AWAIT
//ruta para obtener la info del formulario
router.post("/artist/create", async (req, res) => {
  // res.send(req.body);
  const { name, genre, country } = req.body;
  await Artist.create({ name, genre, country });
  res.redirect("/");
});

//Vista de detalle del artista
router.get("/artist/:artistId", async (req, res) => {
  try {
    const { artistId } = req.params;
    const artist = await Artist.findById(artistId).populate("albums");
    res.render("artist/detail", artist);
    console.log(artist);
  } catch (e) {
    console.log(e);
  }
});

//--------------------------->Albums<-------------------------------

//Mostrar el form para crear el album
router.get("/album/create", async (req, res) => {
  //Esta ruta necesita saber que artistas existen en la db
  const artists = await Artist.find();
  res.render("album/create", { artists });
});

//Crear la ruta que va a recibir la info del formulario

router.post("/album/create", async (req, res) => {
  // res.send(req.body);
  //1.Crear el album en la base de datos
  const { title, description, artistId } = req.body;
  const album = await Album.create({
    title,
    description,
    artist: artistId,
  });
  //2. obtener el artista de ese album y le agregamos el id del album nuevo
  await Artist.findByIdAndUpdate(artistId, { $push: { albums: album._id } });
  res.redirect("/");
});

module.exports = router;
