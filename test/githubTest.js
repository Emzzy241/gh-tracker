const { fetchIssues, fetchPullRequests, fetchContributors } = require('../src/services/github');

async function test() {
  try {
    const issues = await fetchIssues('nodejs', 'node', {
      state: 'open',
      labels: 'bug',
      limit: 5,
    });
    console.log('--- Issues ---');
    console.log(issues);

    const prs = await fetchPullRequests('rccghope', 'RccgHopeOfficial', {
      state: 'closed',
      limit: 3,
    });
    console.log('--- Pull Requests ---');
    console.log(prs);


    const contributors = await fetchContributors('rccghope', 'RccgHopeOfficial');
    console.log('--- Contributors ---');
    contributors.forEach(c => console.log(`${c.login} (${c.contributions} contributions)`));

    
    
    // Test fetching collaborators

    // const collaborators = await fetchCollaborators('rccghope', 'RccgHopeOfficial');
    // console.log('--- Collaborators ---');
    // collaborators.forEach(c => {
    //   console.log(`${c.login} - ${c.html_url}`);
    // });

  } catch (err) {
    console.error('Error:', err.message);
  }

}

test();
