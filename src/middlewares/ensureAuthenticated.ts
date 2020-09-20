import { Request, Response, NextFunction} from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '../errors/AppErrors';
import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
  ): void {

  // Verifica se o token está no cabeçalho
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  //Se existir o tpken
  //Validação do token
  // 1º - Desestruturação para separar o tipo de token do valor
  //Quando colocamos a virgula estamos a indicar que não vamos utilizar o valor daquela posição
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    }

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
