
import {
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    MAIN_ROUTE, NOTFOUND_ROUTE, BOARD_ROUTE, THREAD_ROUTE, ADMIN_ROUTE
} from "./utils/consts";
import Auth from "./pages/Auth";
import Main from "./pages/Main";
import NotFoundPage from "./pages/NotFoundPage";
import Board from "./pages/Board";
import Thread from "./pages/Thread";
import Admin from "./pages/Admin";


//
// export const authRoutes = [
//
//
// ]

export const publicRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: BOARD_ROUTE ,
        Component: Board
    },
    {
        path: THREAD_ROUTE,
        Component: Thread
    },

    // {
    //     path: USER_ROUTE + '/:id',
    //     Component: Profile
    // },
    // {
    //     path: QUESTION_ROUTE + '/:id',
    //     Component: Question
    // },

]