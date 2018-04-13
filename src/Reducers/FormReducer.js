
const  elementListReducer = (initialState =[],action) =>{
    switch (action.type){
        
        case "ADD_CONTACT": 
            var  data = action.payload;
            var initialState = initialState.slice();
            initialState.push(data);
            break;
        case "UPDATE_CONTACT": 
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
                break    
        
        case "RETRIEVE_DATA": 
            var  data = action.payload;
            var initialState = initialState.slice();
            initialState=data;
            break;
        
        case "RESET_FORM": 
            var  data = action.payload;
            var initialState = initialState.slice();
            initialState=data;
            break; 

        case "RETRIEVE_DATA_BY_SEARCH": 
            var  data = action.payload;
            var newinitialState = initialState.slice();
            let user=newinitialState.filter((newinitialState,i) => {
                if( newinitialState.name.startsWith(data)){
                   return newinitialState
                }
                
                });
            newinitialState = user;
            break;
    }
    return initialState;
}; 

export default elementListReducer;

