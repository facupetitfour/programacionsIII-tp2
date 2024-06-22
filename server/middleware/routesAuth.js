import jwt from "jsonwebtoken"

class RoutesAuth {
  async handleValidateToken (req,res,next) {
    try {
      const {token} = req.cookies
      if (!token){
        return res.status(401).json({message:"No hay token"})
      }
      next();

    } catch (error) {
      res.status(505).json({message:"error interno del servidor"})
    }

  }
}

export default RoutesAuth