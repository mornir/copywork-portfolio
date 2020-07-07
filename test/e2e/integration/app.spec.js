// colored: grayscale(0)
// not colored: grayscale(1)

describe('The Home Page', () => {
  it('works', () => {
    cy.visit('/')
    cy.contains('Imitation is not just the sincerest form of flattery')
  })

  it('flashes CW randomly', () => {
    cy.clock()
    cy.visit('/')

    cy.get('.force-color').as('cw')

    cy.get('@cw').should('have.css', 'filter', 'grayscale(0)')
    cy.get('@cw').should('have.length', 1)

    cy.tick(3000)

    cy.get('@cw').should('have.css', 'filter', 'grayscale(1)')

    cy.get('.force-color').should('have.length', 1)
  })

  it.skip('lights up on focus', () => {
    cy.clock()
    cy.visit('/')
    cy.get('[data-cy="cw"]:last-child')
      .focus()
      .should('have.css', 'filter', 'grayscale(0)')
      .blur()
      .should('have.css', 'filter', 'grayscale(1)')
  })

  it.only('changes the color of footer and header accordingly', () => {
    const title = 'TakeShape Pricing Page'
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
    cy.get(`[data-test="${title}"]`)
      .click()
      .then(() => {
        cy.contains(title)
        cy.get('header').should('have.css', 'background-color', color)
        cy.get('footer').should('have.css', 'background-color', color)
      })
  })

  it('skips to main content', () => {
    cy.visit('/')
    cy.get('[data-cy="skip"]')
      .focus()
      .click()

    cy.url().should('include', '/#main')
  })
})
