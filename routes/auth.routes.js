const router = require("express").Router();
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {verifyToken} = require("../middlewares/auth.middlewares")

//* Register new user
// POST /api/auth/signup -> Se registra user y lo guarda en db
router.post("/signup", async (req, res, next) => {
  //Request recibe los datos del usuario
  const { email, password, username } =  req.body;
    
  //1. Comprobar campos obligatorios
  if(!email || !password || !username) {
    res.status(400).json({message: 'Debes completar los campos requeridos'});
    return;
  }

  //2. Contraseña cumple los requisitos (Mayus, length, numbers...)
  //password debe contener Mayus, minus, numbers y entre 8-16 chars
  const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/gm
  
  if(!regexPass.test(password)) {
    res.status(400).json({message: "La contraseña debe contener al menos una mayúscula, una minúscula y un número. Entre [8-16] caracteres"})
    return;
  }
  
  const regexEmail = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi
  //3. Email estructura correcta
  if(!regexEmail.test(email)){
    res.status(400).json({message: "Introduce un email válido"})
    return
  }

  try {
    //Parametros OK

    //4. Usuario ya existe
    const foundUserByEmail = await User.findOne({email});
    if(foundUserByEmail){
      res.status(400).json({message: "Usuario ya registrado con este email"})
      return
    }

    //5. Username ya existe
    const foundUserByUsername = await User.findOne({username});
    if(foundUserByUsername){
      res.status(400).json({message: "Este username ya existe"})
      return
    }

    //6. Encriptar password
    const salt = await bcrypt.genSalt(14);
    const hashPassword = await bcrypt.hash(password, salt);

    //Creamos el user en la colección Users de la db
    await User.create({
      email,
      password: hashPassword,
      username
    });

    res.sendStatus(201);
  } 
  catch (error) {
    next(error);
  }
});

//* Authenticate User and send token
// POST /api/auth/login -> Recibe authentication del user, lo verifica y envia token
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  //1. Todos los campos esten rellenados
  if(!email || !password){
    res.status(400).json({message: 'Debes completar los campos requeridos'});
    return;
  }

  try {
    // 2. Comprobar que el usuario existe
    //todo login con username
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      res.status(400).json({ message: "Usuario no encontrado" });
      return;
    }

    //3. Comprobar que la contraseña es correcta
    // const correctPassword = (password === foundUser.password)
    const correctPassword = await bcrypt.compare(password, foundUser.password);

    if(!correctPassword) {
      res.status(400).json({ message: "Contraseña incorrecta" });
      return;
    }

    //4. Enviarle el token al usuario
    const payload = {
      _id: foundUser._id,
      email: foundUser.email
      //todo username, propiedades que identifiquen al user o roles
    }

    const authToken = jwt.sign(payload, process.env.TOKEN_JWT, {
      algorithm: "HS256",
      expiresIn: "7d"
    })

    res.status(200).json({authToken: authToken});
  } 
  catch (error) {
    next(error);
  }
});

//* Verify token
// GET /api/auth/verify -> Verificar si el token es valido, cuando vuelva a la app
router.get("/verify", verifyToken, (req, res)=>{
  console.log(req.payload)

  res.status(200).json(req.payload);
});

router.get("/user/perfil", verifyToken, (req, res) => {

  // todas las llamadas que sean privada DEBERAN tener el verifyToken

  res.json({message: "aqui tienes tu información privada"})

})

module.exports = router;
