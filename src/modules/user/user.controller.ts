import { buildUserService } from './user.service';

export { buildUserController };

function buildUserController() {
    const userService = buildUserService();
    const userController = {
        createUser,
        login,
        getUsersSummary,
    };

    return userController;

    async function createUser(params: { body: { email: string; password: string } }) {
        return userService.createUser(params.body.email, params.body.password);
    }

    async function login(params: { body: { email: string; password: string } }) {
        return userService.login(params.body.email, params.body.password);
    }

    async function getUsersSummary() {
        return userService.getUsersSummary();
    }
}
