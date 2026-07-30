import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

function requestConfig() {
  const token = import.meta.env.VITE_GITHUB_API_KEY;
  return token
    ? { headers: { Authorization: `token ${token}` } }
    : {};
}

export async function fetchUserData(username) {
  const response = await axios.get(
    `${GITHUB_API_URL}/users/${username}`,
    requestConfig(),
  );
  return response.data;
}

export async function searchUsers({
  username,
  location,
  minRepos,
  page = 1,
  perPage = 8,
}) {
  const qualifiers = [username.trim()];
  if (location.trim()) qualifiers.push(`location:${location.trim()}`);
  if (String(minRepos).trim()) qualifiers.push(`repos:>${minRepos}`);

  const response = await axios.get(`${GITHUB_API_URL}/search/users`, {
    ...requestConfig(),
    params: {
      q: qualifiers.join(' '),
      page,
      per_page: perPage,
    },
  });

  const users = await Promise.all(
    response.data.items.map(({ login }) => fetchUserData(login)),
  );

  return {
    users,
    totalCount: response.data.total_count,
  };
}
