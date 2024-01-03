import User from "../models/User.js";
import { validate_token } from "../schemas/token.js";

export let createToken = async (req, res) => {
  const token = validate_token(req.body);
  if(token.error){
    return res.status(400).json(
      {error: token.error.message }
    )
  }

  try {
    const user = await User.findOne(
      { where: { UserAPIUser: token.username, UserAPIPass: token.password } }
      );

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    const IdUser = user.IdUser;
    const token = jwt.sign(
      { IdUser, tipoKey },
      'secreto',
      { expiresIn: '1h' });

    await Tokens.create({ IdUser, tipoKey, token });
    res.status(200).json({ token });

  } catch (error) {
    
    console.error('Error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  
  }

}

