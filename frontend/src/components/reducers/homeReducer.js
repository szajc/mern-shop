export const reducer = (state, action) => {
    if(action.type === 'SETDATA'){
        return {
            ...state,
            data: action.payload,
        }
    }
    if(action.type === 'DELETEITEM'){
        const newData = state.data.filter(item => item._id !== action.payload);
        return {
            ...state,
            data: newData,
            isModalOpen: true,
            modalContent: "Item deleted",
        }
    }
    if(action.type === 'ADDITEM'){
        return {
            ...state,
            data: [ action.payload , ...state.data ],
            isModalOpen: true,
            modalContent: "Item added",
        }
    }
    if(action.type === 'NO_VALUE'){
        return {
            ...state,
            isModalOpen: true,
            modalContent: "Please enter value",
        }
    }
    if(action.type === 'CLOSE_MODAL'){
        return {
            ...state,
            isModalOpen: false,
        }
    }
    throw new Error ('no matching action type');
}