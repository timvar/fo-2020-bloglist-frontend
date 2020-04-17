import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import TogglableBlog from './TogglableBlog'
import Blog from './Blog'

describe('<TogglableBlog />', () => {
  let component

  const blog = {
    id: 1,
    author: 'Tero Testi',
    title: 'Testicase',
    url: 'www.testi.fi',
    likes: 5
  }

  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <TogglableBlog buttonLabel="show...">
        <Blog key={blog.id} blog={blog} className='foo' handleAddLike={mockHandler}/>
      </TogglableBlog>
    )
  })

  test('at start the title and author are shown, url and likes are NOT shown', () => {
    const div = component.container.querySelector('.initialContent')
    expect(div).toHaveTextContent(
      'Testicase Tero Testi'
    )
    expect(div).not.toHaveTextContent(
      'url: www.testi.fi'
    )
    expect(div).not.toHaveTextContent(
      'likes: 5'
    )
  })

  test('after clicking the button, likes and url are shown', () => {
    const button = component.getByText('show...')
    fireEvent.click(button)
    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent(
      'url: www.testi.fi'
    )
    expect(div).toHaveTextContent(
      'likes: 5'
    )
  })

  test('pressing like twice button calls event handler twice', () => {
    const button = component.getByText('show...')
    const likeButton = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(1)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
