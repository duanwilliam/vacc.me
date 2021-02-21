import { Actions } from 'actions';

export const getSites = (items) => async dispatch => {
  console.log('GETTING SITES');
  const response = await fetch('https://agile-retreat-84346.herokuapp.com/api/sites/getSites'/* getSites api route */, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!data) throw new Error('Empty response from server');
  if (data.error) throw new Error(data.error.message);

  const nameToData = {}
  for(let obj of data) {
    nameToData[obj.name] = {
      address: obj.address,
      lat: obj.lat,
      long: obj.long,
      type: obj.type,
      times: obj.times,
    }
  }
  dispatch({
    type: Actions.GET_SITES,
    payload: nameToData
  });
}

export const filterSites = (filters) => async dispatch => {
  console.log('FILTERING SITES');
  const response = await fetch('https://agile-retreat-84346.herokuapp.com/api/sites/filterSites'/* filterSites api route */, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filters: {
        ...filters,
        time: filters.time ? filters.time.hours() + filters.time.minutes()/60 : ''
      }
    }),
  });

  const data = await response.json();
  if (!data) throw new Error('Empty response from server');
  if (data.error) throw new Error(data.error.message);

  dispatch({
    type: Actions.FILTER_SITES,
    payload: data
  });
}