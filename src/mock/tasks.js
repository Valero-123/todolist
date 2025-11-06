export const tasks = [
    {
        id:'1',
        title:'Выспаться',
        status:'backLog',
    },
    {
        id:'2',
        title:'Выучить js',
        status:'backLog',
    },
    {
        id:'3',
        title:'Сделать РПИ',
        status:'inProcess',
    },
    {
        id:'4',
        title:'Погулять с собакой',
        status:'ready',
    },
    {
        id:'5',
        title:'Покушать',
        status:'ready',
    },
    {
        id:'6',
        title:'Востановить режим',
        status:'trash'
    }

]
export const UserAction = {
    UPDATE_TASK: 'UPDATE_TASK',
    ADD_TASK: 'ADD_TASK',
    DELETE_TASK: 'DELETE_TASK',
    LOADING_START: 'LOADING_START',
    LOADING_END: 'LOADING_END'
};

export const UpdateType = {
    PATCH: 'PATCH',
    MINOR: 'MINOR',
    MAJOR: 'MAJOR',
    INIT: 'INIT'
};