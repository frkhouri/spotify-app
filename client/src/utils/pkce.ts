import PKCE from 'js-pkce';

const pkce = new PKCE({
  client_id: 'client_id',
  redirect_uri: 'redirect_uri',
  authorization_endpoint: 'https://accounts.spotify.com/authorize',
  token_endpoint: 'https://accounts.spotify.com/api/token',
  requested_scopes: 'user-top-read,playlist-read-private,user-read-recently-played,user-follow-read,user-modify-playback-state,user-library-read,user-library-modify,user-read-playback-state',
});

export default pkce;