import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Togglable from './Togglable'


describe('<Togglable /> Component Tests', () => {
  let component

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel="Show Children">
        <div className="childDiv" />
      </Togglable>
    )
  })

  test('children are rendered', () => {
    component.container.querySelector('.childDiv')
  })

  test('children are not displayed when not shown', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })

  test('children are displayed after clicking show button', () => {
    const button = component.getByText('Show Children')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('children are hidden after clicking cancel button', () => {
    const showButton = component.getByText('Show Children')
    fireEvent.click(showButton)

    const cancelButton = component.getByText('Cancel')
    fireEvent.click(cancelButton)

    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
})