import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import AppError from '../errors/AppErrors';
import uploadConfig from '../config/upload';
import User from '../models/Users';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      // Se existir um avatar, DELETA!
      // 1º - Pega o caminho do file
      // 2º - Verifica se o caminho existe
      // 3º - Se existir o caminho, então elimina o link (DELETA o caminho ao file)
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    // Actualiza o avatar depois de ser eliminado o anterior ou
    // Adiciona o avatar caso não exista
    // OBS: O método save(), serve para criar um novo objecto ou actualizar um existente
    // verificando se existe um id do objecto passado como parametro
    user.avatar = avatarFilename;
    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
