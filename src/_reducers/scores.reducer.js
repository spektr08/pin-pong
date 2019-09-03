import { scoreConstants } from '../_constants';

export function scores(state = {items:[],ranks:[]}, action) {
    switch (action.type) {
        case scoreConstants.ADD_REQUEST:
            return {
                loading:true,
                items: state.items
            };
        case scoreConstants.ADD_SUCCESS:
            return {
                items: [...state.items, action.score]
            };
        case scoreConstants.ADD_FAILURE:
            return {
                error: action.error
            };
        case scoreConstants.GETALL_REQUEST:
            return {
                loading:true,
                items: state.items
            };
        case scoreConstants.GETALL_SUCCESS:
            return {
                items: action.scores
            };
        case scoreConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case scoreConstants.GETALLRANK_REQUEST:
            return {
                loading:true,
                items: state.items,
                ranks: state.ranks
            };
        case scoreConstants.GETALLRANK_SUCCESS:
            return {
                ranks: action.scores,
                items: state.items
            };
        case scoreConstants.GETALLRANK_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}