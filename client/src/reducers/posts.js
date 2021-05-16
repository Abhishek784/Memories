import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

export default(posts=[],action)=>{

    switch(action.type){
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...posts, action.payload];
        case UPDATE:
            console.log("update");
            return posts.map((post)=>post._id ==action.payload._id ? action.payload:post);
        // case LIKE:
        //     console.log("like");
        //     return posts.map((post)=>post._id ==action.payload._id ? action.payload:post);
        case LIKE:
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
        case DELETE:
            console.log("to be deleted:.....")
            return posts.filter((post) => post._id != action.payload);
        default:
            return posts;
    }
}