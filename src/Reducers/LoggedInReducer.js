const  loggedInReducer = (initialState =[],action) =>{
    switch (action.type){
    
        case "LOAD_USER_DETAIL": 
                var  data = action.payload;
                var initialState = initialState.slice();
                initialState =data;
                break;   
         case "RESET_LOGGED": 
                var  data = action.payload;
                var initialState = initialState.slice();
                initialState=data;
                break;         
        
    }
    return initialState;
        
}
export default loggedInReducer;