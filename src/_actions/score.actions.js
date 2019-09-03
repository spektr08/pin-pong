import { scoreConstants } from '../_constants';
import { scoreService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const scoreActions = {
    getAll,
    getAllRank,
    add,
    delete: _delete,
};

function add(player1, score1, player2, score2,user_id) {
    return dispatch => {
        if(score1 > score2){
            var win_player1 = 1;
            var win_player2 = 0;
        }else if(score1 == score2){
            var win_player1 = 0;
            var win_player2 = 0;
        }else{
            var win_player1 = 0;
            var win_player2 = 1;
        }

        if(player1 == player2){
            dispatch(alertActions.error("Players can't be same"));
        }else{
            const score = {player1, score1, player2, score2,user_id,win_player1,win_player2};
            dispatch(request( score ));

            scoreService.add(score)
                .then(
                    score_resp => {
                        dispatch(success(score));
                        history.push('/');
                        dispatch(alertActions.success('Added New Game'));
                    },
                    error => {
                        dispatch(failure(error.toString()));
                        dispatch(alertActions.error(error.toString()));
                    }
                );

        }

    };

    function request(score) { return { type: scoreConstants.ADD_REQUEST, score } }
    function success(score) { return { type: scoreConstants.ADD_SUCCESS, score } }
    function failure(error) { return { type: scoreConstants.ADD_FAILURE, error } }
}


function getAll() {
    return dispatch => {
        dispatch(request());

        scoreService.getAll()
            .then(
                scores => dispatch(success(scores)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: scoreConstants.GETALL_REQUEST } }
    function success(scores) {  return { type: scoreConstants.GETALL_SUCCESS, scores } }
    function failure(error) { return { type: scoreConstants.GETALL_FAILURE, error } }
}

function getAllRank() {
    return dispatch => {
        dispatch(request());

        scoreService.getAllRank()
            .then(
                scores => dispatch(success(scores)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: scoreConstants.GETALLRANK_REQUEST } }
    function success(scores) { return { type: scoreConstants.GETALLRANK_SUCCESS, scores } }
    function failure(error) { return { type: scoreConstants.GETALLRANK_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}