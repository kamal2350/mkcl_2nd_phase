import { createContext,useReducer } from "react";
const emp= JSON.parse(window.localStorage.getItem("user"));
const initialState={
    
    user:emp?emp:null,
    loading:false,
    error:null
};

export const AuthContext = createContext(initialState);

const AuthReducer =(state,action)=>{
    switch (action.type){
        case 'LOGIN_START':
            return{
                user:null,
                loading:true,
                error:null,
            }
        case 'LOGIN_SUCCESS':
            return{
                loading:false,
                user:action.payload,
                error:null,
            }
        case 'LOGIN_FAILURE':
            return{
                loading:false,
                user:null,
                error:action.payload
            }
        case 'LOGOUT':
            localStorage.removeItem("user");
            return{
                loading:false,
                user:null,
                error:null,
                
            }
            
        default :
        return state
    }
}

export const AuthContextProvider= ({children})=>{
    const[state,dispatch]= useReducer(AuthReducer,initialState);
    return(
        <AuthContext.Provider value={
            {
                user:state.user,
                loading:state.loading,
                error:state.error,
                dispatch
            }
        }>  
        {children}

        </AuthContext.Provider>
    )
}