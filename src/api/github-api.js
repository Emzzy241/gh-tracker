const axios = require('axios');
const configUtil = require('../utils/config');

class GitHubAPI {
    constructor() {
        this.baseUrl = 'https://api.github.com';
        this.client = null;
    }

    async initialize() {
        const config = await configUtil.getConfig();

        // Create an axios instance with default options
        this.client = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                ...(config.token && { 'Authorization': `token ${config.token}` }),
            },
        });

        // Add response handler for errors
        this.client.interceptors.response.use(
            response => response,
            error => {
                if (error.response) {
                    const { status, data } = error.response;

                    // Handling the different errors that user may encounter
                    if (status === 401)
                        throw new Error('Authentication failed. Please check your GitHub token.');
                    else if (status === 403 && data.message.includes('rate limit'))
                        throw new Error('GitHub API rate limit exceeded. Consider adding a personal access token using: gh-tracker config --set-token <token>');
                    else if (status === 404)
                        throw new Error('Repository not found or you don\'t have access to it.');
                    else
                        throw new Error(`GitHub API error: ${data.message || 'Unknown error'}`);
                }
                else if (error.request)
                    throw new Error('Network error. Unable to connect to GitHub.')
                throw error;
            }
        );
    }

    async request(method, url, params = {}) {
        if (!this.client) {
            await this.initialize();
        }

        try {
            const response = await this.client.request({
                method,
                url,
                params,
            });

            return response.data;
        } catch (error) {
            // Let the interceptor handle the errors
            throw error;
        }
    }

    parseRepoString(repoString) {
    if (!repoString.includes('/')) {
        throw new Error('Invalid repository format. Use owner/repo format (e.g., nodejs/node)');
    }
        const [owner, repo] = repoString.split('/');
        return { owner, repo };
    }
}

module.exports = new GitHubAPI();