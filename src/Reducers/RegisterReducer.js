const  registerReducer = (initialState =[],action) =>{
    switch (action.type){
        case "ADD_USER": 
            var  data = action.payload;
            var initialState = initialState.slice();
            initialState=data;
            break;
        
        case "LOAD_USER": 
            var  data = action.payload;
            var initialState = initialState.slice();
            let user=data.filter((data,i) => {
                if(! data.type.startsWith("Admin")){
                   return data
                }
            });
            initialState =user;
            break;
        case "RESET_REGISTER": 
            var  data = action.payload;
            var initialState = initialState.slice();
            initialState=data;
            break;   
        case "ENABLE_USER": 
            var  data = action.payload;
            var initialState = initialState.slice();
            let element=initialState.map((initialState,i) => {
            if( initialState.id == data.id){
               return initialState =data
            }
            else {
               return initialState
            }
            });
            initialState =element;
            break;
        case "DISABLE_USER": 
            var  data = action.payload;
            var initialState = initialState.slice();
            let elements=initialState.map((initialState,i) => {
               if( initialState.id == data.id){
                   return initialState =data
                }
               else {
                   return initialState
               }
            });
            initialState =elements;
            break;
    }
    return initialState;
        
}
export default registerReducer;