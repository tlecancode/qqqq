import axios from 'axios'

export const FETCH_Q = 'FETCH_Q'

export function initQ() {
  return (dispatch, getState) => {
    if(!getQueryVariable('dep')){
      alert('You must enter the department Id (?dep=<department_id>)')
      return
    }
    dispatch(fetchQ(getQueryVariable('dep')))
    setInterval(() => {
      dispatch(fetchQ(getQueryVariable('dep')))
    }, 5000)
  }
}

export function fetchQ(depId) {
  return (dispatch) => {
    axios.get(`/api/${depId}`)
      .then((response) => dispatch({type: FETCH_Q, payload: response.data}))
  }
}

function getQueryVariable(variable) {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
