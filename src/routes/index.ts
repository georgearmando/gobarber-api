import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';


const routes = Router();

/**
 * Faz com que o que vem depois de toda a rota que comece com /appointment seja ela um
 * get, post, put ou delete, seja repassada para o appointmentRouter
 */
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
