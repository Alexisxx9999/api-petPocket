const passport = require("passport");
const orm = require("../Database/dataBase.orm.js");
const sql = require("../Database/dataBase.sql");
const indexCtl = {};

indexCtl.mostrar = async (req, res) => {
  try {
    await sql.promise().execute("select * from usuarios");
    await sql.promise().execute("select * from usuarios");
    const [pagina] = await sql.promise().query("SELECT * FROM usuarios ");
    res.json({ lista: pagina, csrfToken: req.csrfToken() });
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    res.status(500).send("Error interno del servidor");
  }
};

indexCtl.mostrarRegistro = async (req, res) => {
  try {
    const usuario = await sql.query("select COUNT(*) AS total from users");
    if (usuario[0].total === 0) {
      const [rows] = await sql
        .promise()
        .query("SELECT MAX(idUser) AS Maximo FROM users");
      res.render("login/regitser", { lista: rows, csrfToken: req.csrfToken() });
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    res.status(500).send("Error al realizar la consulta");
  }
};

indexCtl.registro = passport.authenticate("local.signup", {
  successRedirect: "/closeSection",
  failureRedirect: "/Register",
  failureFlash: true,
  failureMessage: true,
});

indexCtl.login = (req, res, next) => {
  passport.authenticate("local.signin", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/Register");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/page/add/" + req.user.idUser);
    });
  })(req, res, next);
};

indexCtl.CerrarSesion = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Cerrada la Sesión con éxito.");
    res.redirect("/");
  });
};

module.exports = indexCtl;
