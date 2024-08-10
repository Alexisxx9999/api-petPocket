const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const db = require("../Database/dataBase.orm"); // Adjust the path to your ORM file

const Usuario = db.Usuarios; // Ensure 'usuarios' is imported correctly

passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "emailUsuario", // Updated from 'correo' to 'emailUsuario'
      passwordField: "contraseñaUsuario", // Updated from 'contrasena' to 'contraseñaUsuario'
      passReqToCallback: true,
    },
    async (req, emailUsuario, contraseñaUsuario, done) => {
      try {
        const usuario = await Usuario.findOne({ where: { emailUsuario } });
        if (!usuario) {
          return done(
            null,
            false,
            req.flash("message", "El correo electrónico no existe.")
          );
        }

        const validPassword = await bcrypt.compare(
          contraseñaUsuario,
          usuario.contraseñaUsuario
        );
        if (!validPassword) {
          return done(
            null,
            false,
            req.flash("message", "Contraseña incorrecta.")
          );
        }

        return done(
          null,
          usuario,
          req.flash("success", `Bienvenido ${usuario.nombreUsuario}`)
        );
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "emailUsuario", // Updated from 'correo' to 'emailUsuario'
      passwordField: "contraseñaUsuario", // Updated from 'contrasena' to 'contraseñaUsuario'
      passReqToCallback: true,
    },
    async (req, emailUsuario, contraseñaUsuario, done) => {
      try {
        const existingUsuario = await Usuario.findOne({
          where: { emailUsuario },
        });
        if (existingUsuario) {
          return done(
            null,
            false,
            req.flash("message", "El correo electrónico ya está registrado.")
          );
        }

        const hashedPassword = await bcrypt.hash(contraseñaUsuario, 10);
        const {
          nombreUsuario,
          apellidoUsuario,
          telefonoUsuario,
          cedulaUsuario,
          ubicacionUsuario,
        } = req.body;

        const nuevoUsuario = await Usuario.create({
          nombreUsuario,
          apellidoUsuario,
          emailUsuario,
          telefonoUsuario,
          contraseñaUsuario: hashedPassword,
          estadoUsuario: "Agregado",
          ubicacionUsuario,
          cedulaUsuario,
        });

        return done(null, nuevoUsuario);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((usuario, done) => {
  done(null, usuario.idUsuario);
});

passport.deserializeUser(async (idUsuario, done) => {
  try {
    const usuario = await Usuario.findByPk(idUsuario);
    done(null, usuario);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
