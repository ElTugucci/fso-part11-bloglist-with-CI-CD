Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:5001/api/login', {
    username: username,
    password: password,
  }).then((response) => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body));
    cy.visit('');
  });
});

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  const loggedUser = JSON.parse(localStorage.getItem('loggedBlogappUser'));
  const { name, token } = loggedUser;

  cy.request({
    url: 'http://localhost:5001/api/blogs',
    method: 'POST',
    body: { title, author, url, name, likes },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  cy.visit('');
});
