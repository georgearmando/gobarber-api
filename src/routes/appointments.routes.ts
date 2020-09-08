import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentRouter = Router();

const appointmentsRepository = getCustomRepository(AppointmentsRepository);

appointmentRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.find();

  return response.json(appointments);
})

appointmentRouter.post('/', async (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedData = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({ date: parsedData, provider });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

export default appointmentRouter;
