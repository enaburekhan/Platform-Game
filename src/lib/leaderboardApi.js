// {"result":"Game with ID: 10foBk1zR7OH0WZsqBBL added."}
export const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/10foBk1zR7OH0WZsqBBL/scores';

const handleErrors = (response) => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
};

export const getScores = (url) => fetch(url)
  .then(handleErrors)
  .then(response => response.json())
  .then(data => {
    if (data.result.length === 0) {
      throw new Error();
    }
    return data.result.sort((m, n) => n.score - m.score);
  });

export const postScores = (user, score, url) => fetch(url,
  {
    method: 'POST',
    mode: 'cors',
    headers:
      { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user, score }),
  })
  .then(handleErrors);
