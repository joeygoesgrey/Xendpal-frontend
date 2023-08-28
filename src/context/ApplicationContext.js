import { createContext, useReducer } from "react";

const INITIAL_STATE = {
    loading: false,
    sidebarToggle: false,
    userinfo: null,
    isUserLoggedIn: false,
    userItems: null,
    refreshUserItems: false,
    searchTerm: "",
}

export const ApplicationContext = createContext(INITIAL_STATE);

const ApplicationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USERINFO':
            return { ...state, userinfo: action.payload };
        case 'SET_ISUSERLOGGEDIN':
            return { ...state, isUserLoggedIn: action.payload };
        case 'SET_USERITEMS':
            return { ...state, userItems: action.payload };
        case 'SET_REFRESHUSERITEMS':
            return { ...state, refreshUserItems: action.payload };
        case 'SET_SEARCHTERM':
            return { ...state, searchTerm: action.payload };

        default:
            return state;
    }
}

export const ApplicationContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ApplicationReducer, INITIAL_STATE);

    return (
        <ApplicationContext.Provider value={{
            loading: state.loading,
            sidebarToggle: state.sidebarToggle,
            userinfo: state.userinfo,
            isUserLoggedIn: state.isUserLoggedIn,
            userItems: state.userItems,
            refreshUserItems: state.refreshUserItems,
            searchTerm: state.searchTerm,
            dispatch
        }}>
            {children}
        </ApplicationContext.Provider>
    );
}

