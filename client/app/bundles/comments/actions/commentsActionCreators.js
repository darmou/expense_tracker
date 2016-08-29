import requestsManager from 'libs/requestsManager';
import * as actionTypes from '../constants/commentsConstants';

export function setIsFetching() {
  return {
    type: actionTypes.SET_IS_FETCHING,
  };
}

export function setIsSaving() {
  return {
    type: actionTypes.SET_IS_SAVING,
  };
}

export function setClearStore() {
  return {
    type: actionTypes.CLEAR_EXPENSES,
    expenses: [],
  };
}

export function fetchCommentsSuccess(data) {
  return {
    type: actionTypes.FETCH_COMMENTS_SUCCESS,
    expenses: JSON.parse(data.expenses),
  };
}

export function fetchCommentsFailure(error) {
  return {
    type: actionTypes.FETCH_COMMENTS_FAILURE,
    error,
  };
}

export function submitCommentSuccess(comment) {
  return {
    type: actionTypes.SUBMIT_COMMENT_SUCCESS,
    comment,
  };
}

export function submitCommentFailure(error) {
  return {
    type: actionTypes.SUBMIT_COMMENT_FAILURE,
    error,
  };
}

export function fetchExpenses(user_id) {
  return dispatch => {
    dispatch(setIsFetching());
    return (
      requestsManager
        .fetchEntities(user_id)
        .then(res => dispatch(fetchCommentsSuccess(res.data)))
        .catch(res => dispatch(fetchCommentsFailure(res.data)))
    );
  };
}

export  function clearExpenses() {
  return dispatch => {
    dispatch(setClearStore());

  };
}

export function submitComment(comment) {
  return dispatch => {
    dispatch(setIsSaving());
    return (
      requestsManager
        .submitEntity({ comment })
        .then(res => dispatch(submitCommentSuccess(res.data)))
        .catch(res => dispatch(submitCommentFailure(res.data)))
    );
  };
}
