import React from 'react'
import { render,  waitForElement } from '@testing-library/react'
jest.mock('./services/notes')
import App from './App'

describe('<App /> Integration Tests', () => {
  test('renders all notes from service', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(
      () => component.container.querySelector('.mainNote')
    )

    const notes = component.container.querySelectorAll('.mainNote')
    expect(notes.length).toBe(3) 

    expect(component.container).toHaveTextContent(
      'This is a mock note!'
    )
    expect(component.container).toHaveTextContent(
      'This is another mock note.'
    )
    expect(component.container).toHaveTextContent(
      'This is the third mock note.'
    )
  })
})