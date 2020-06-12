import { STATE_MANAGER } from './constants.js';
import { v4 as uuidv4 } from 'uuid';

export default class StateManager {

    constructor() {
        this.statesBySessionCookie = {};
    }

    getStateBySessionCookie(socket, sessionCookie) {
        console.log(`[StateManager] [getStateBySessionCookie] - sessionCookie: ${sessionCookie}`);

        let response = {};

        if (sessionCookie && sessionCookie in this.statesBySessionCookie) {
            response = {
                status: STATE_MANAGER.STATUS.FOUND,
                state: this.statesBySessionCookie[sessionCookie],
            };
        } else {
            const newSessionCookie = uuidv4();

            const newState = {
                sessionCookie: newSessionCookie,
                username: null,
                gameIds: [],
            };

            this.statesBySessionCookie[newSessionCookie] = newState;

            response = {
                status: STATE_MANAGER.STATUS.CREATED,
                state: newState,
            }
        }

        console.log(`[StateManager] [getStateBySessionCookie] - emitting response: ${JSON.stringify(response)}`);

        socket.emit('getUpdatedStateForSessionCookie', response);
    }

    setUsernameForSessionCookie(socket, sessionCookie, username) {
        console.log(`[StateManager] [setUsernameForSessionCookie] - sessionCookie: ${sessionCookie}, username: ${username}`);

        this.statesBySessionCookie[sessionCookie]['username'] = username;

        const response = this.statesBySessionCookie[sessionCookie];

        console.log(`[StateManager] [setUsernameForSessionCookie] - emitting response: ${JSON.stringify(response)}`);

        socket.emit('getUpdatedStateForSessionCookie', response);
    }
}
