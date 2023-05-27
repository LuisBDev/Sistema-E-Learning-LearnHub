import User from "../models/user.js";
import { hashPassword, comparePassword } from "../utils/auth.js";

export const register = async (req, res) => {
  try {
    // console.log(req.body);
    const { name, email, password } = req.body;
    //validacion
    if (!name) {
      return res.status(400).send("Name is required");
    }

    if (!password || password.length < 6) {
      return res
        .status(400)
        .send(
          "La contraseña es obligatoria y debe tener al menos 6 caracteres"
        );
    }

    let userExist = await User.findOne({ email }).exec();

    if (userExist) {
      return res.status(400).send("El email ya existe");
    }

    //hash password
    const hashedPassword = await hashPassword(password);

    //registro
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    return res.json({ ok: true });


  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Intenta de nuevo.");
  }
};
