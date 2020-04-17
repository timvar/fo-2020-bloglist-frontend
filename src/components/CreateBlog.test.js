import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateBlog from './CreateBlog'

test('<CreateBlog /> calls onSubmit and has correct information in the form', () => {
  const createBlog = jest.fn()

  const component = render(
    <CreateBlog handleAddBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const author = component.container.querySelector('#author')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'Fullstack test case' }
  })
  fireEvent.change(url, {
    target: { value: 'www.fullstackopen.com' }
  })
  fireEvent.change(author, {
    target: { value: 'Johtaja Turhapuro' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].author).toBe('Johtaja Turhapuro')
  expect(createBlog.mock.calls[0][0].title).toBe('Fullstack test case')
  expect(createBlog.mock.calls[0][0].url).toBe('www.fullstackopen.com')

})
