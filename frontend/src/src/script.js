// window.onSpotifyWebPlaybackSDKReady = () => {
//   const token = 'BQDHoYvd0llwd9nzFSaI_y9lKkOCHQzxCy9sqSOW8fUsEIXL_VsTLMpHo4QBeqHrl_9f8NzHhv2w1_V7GvARHKhsxCIRa_G1bTW8LbQTDgm3L2wUPealtqWa0Dmenblfu-KSyyKUMdXrpK05lKLJwoTAGBzM';
//   const player = new Spotify.Player({
//     name: 'Web Playback SDK Quick Start Player',
//     getOAuthToken: cb => { cb(token); }
//   });
//
//   // Error handling
//   player.addListener('initialization_error', ({ message }) => { console.error(message); });
//   player.addListener('authentication_error', ({ message }) => { console.error(message); });
//   player.addListener('account_error', ({ message }) => { console.error(message); });
//   player.addListener('playback_error', ({ message }) => { console.error(message); });
//
//   // Playback status updates
//   player.addListener('player_state_changed', state => { console.log(state); });
//
//   // Ready
//   player.addListener('ready', ({ device_id }) => {
//     console.log('Ready with Device ID', device_id);
//   });
//
//   // Not Ready
//   player.addListener('not_ready', ({ device_id }) => {
//     console.log('Device ID has gone offline', device_id);
//   });
//
//   // Connect to the player!
//   player.connect();
// };
