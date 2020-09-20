import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentRouter = Router();

// Como todas as rotas vão usar autenticação, então aplicamos ela no metodo use
// Para usar em rotas específicas podemos inserir nos parametros da rota.
appointmentRouter.use(ensureAuthenticated)

appointmentRouter.get('/', async (request, response) => {

  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
})

appointmentRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedData = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({ date: parsedData, provider_id });

  return response.json(appointment);
})

export default appointmentRouter;
