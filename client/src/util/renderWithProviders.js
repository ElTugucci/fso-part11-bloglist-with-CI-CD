// eslint-disable-next-line no-unused-vars
import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter, Routes, Route } from 'react-router-dom'

export const renderWithProviders = (ui, { preloadedState = {}, route = '/', path = '*' } = {}) => {
  const store = configureStore({
    reducer: {
      blogs: (state = preloadedState.blogs || []) => state,
    },
    preloadedState,
  })

  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[route]}
          future={{
            v7_relativeSplatPath: true,
            v7_startTransition: true,
          }}
        >
          <Routes>
            <Route path={path} element={ui} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    ),
  }
}
