import PKCE from 'js-pkce';

const pkce = new PKCE({
  client_id: '8844a79bfd4d467e9ed94005a6b9da4b',
  redirect_uri: 'http://10.0.0.240:8000/callback',
  // redirect_uri: 'https://spotify-app-5bb09.web.app/callback',
  authorization_endpoint: 'https://accounts.spotify.com/authorize',
  token_endpoint: 'https://accounts.spotify.com/api/token',
  requested_scopes:
    'user-top-read,playlist-read-private,user-read-recently-played,user-follow-read,user-modify-playback-state,user-library-read,user-library-modify,user-read-playback-state,streaming,user-read-email,user-read-private',
});

export default pkce;
