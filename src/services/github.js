// services/github.js
const axios = require('axios');
const { getToken } = require('../config/token');

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Accept': 'application/vnd.github+json',
  },
});

// Attach token if available
githubApi.interceptors.request.use((config) => {
  const token = getToken(); // Read token from config file
  if (token) {
    config.headers.Authorization = `token ${token}`;
  }
  return config;
});

async function fetchIssues(owner, repo, { state, labels, limit }) {
  const params = {
    state: state || 'open',
    labels,
    per_page: limit || 30,
  };

  const res = await githubApi.get(`/repos/${owner}/${repo}/issues`, { params });
  return res.data.filter(issue => !issue.pull_request); // Remove PRs
}

async function fetchPullRequests(owner, repo, { state, limit }) {
  const params = {
    state: state || 'open',
    per_page: limit || 30,
  };

  const res = await githubApi.get(`/repos/${owner}/${repo}/pulls`, { params });
  return res.data;
}

// async function fetchCollaborators( owner, repo) {
//     const res = await githubApi.get(`/repos/${owner}/${repo}/collaborators`);
//     return res.data;
// }

async function fetchContributors(owner, repo) {
    const res = await githubApi.get(`/repos/${owner}/${repo}/contributors`);
    return res.data;
}
  

module.exports = {
  fetchIssues,
  fetchPullRequests,
//   fetchCollaborators,
  fetchContributors,
};
