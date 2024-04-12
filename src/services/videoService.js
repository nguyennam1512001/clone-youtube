import axios from 'axios';

export function subscribeToChannel(channelId, access_token) {
  return axios.post(`https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&access_token=${access_token}`, {
    snippet: {
      resourceId: {
        kind: 'youtube#channel',
        channelId: channelId,
      },
    },
  });
}
