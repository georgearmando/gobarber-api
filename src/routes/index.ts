import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import appointmentRouter from './appointments.routes';

const routes = Router();

/**
 * Faz com que o que vem depois de toda a rota que comece com /appointment seja ela um
 * get, post, put ou delete, seja repassada para o appointmentRouter
 */
routes.use('/appointments', appointmentRouter);

export default routes;
