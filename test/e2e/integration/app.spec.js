describe('The Website', () => {
  it('works', () => {
    cy.visit('/')
    cy.contains('Imitation is not just the sincerest form of flattery')
  })

  it('flashes CW randomly', () => {
    cy.window().then(win => {
      cy.clock()
      cy.visit('/')

      cy.get('[data-cy="cw"]:not(.copywork)').as('lighted')

      cy.get('@lighted').should('have.css', 'filter', 'none')
      cy.get('@lighted').should('have.length', 1)

      cy.tick(3000)

      cy.get('@lighted').should('have.css', 'filter', 'grayscale(1)')

      cy.get('[data-cy="cw"]:not(.copywork)').should('have.length', 1)
    })
  })

  it('changes the color of footer and header accordingly', () => {
    const title = 'ShapeTake Pricing Page'
    const color = 'rgb(94, 222, 179)'
    cy.server()
    cy.route({
      method: 'GET', // Route all GET requests
      url: `**codepen**`, // that have a URL that matches
      response: {
        result: {
          codepen: 'wRRJNd',
          color,
          copiedURL: 'https://www.takeshape.io/pricing/',
          title,
          video:
            'https://res.cloudinary.com/infonuagique/video/upload/v1547835506/copywork/TakeShape/TakeShape_Pricing_Page',
        },
      },
    })
    cy.visit('/')
    cy.get('[data-cy="cw"]:not(.copywork)').click()

    cy.contains(title)

    cy.get('header').should('have.css', 'background-color', color)
    cy.get('footer').should('have.css', 'background-color', color)
  })
})
