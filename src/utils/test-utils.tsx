import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import { render as rtlRender, RenderOptions } from '@testing-library/react-native'
import {
  configureStore,
  EmptyObject,
  EnhancedStore,
  PreloadedState,
} from '@reduxjs/toolkit'
import { RootState } from '../store'
import shoppingCartSlice from '../store/shoppingCart/shoppingCartSlice'

type ReducerTypes = Pick<RootState, 'shoppingCart'>
type TStore = EnhancedStore<ReducerTypes>

type CustomRenderOptions = {
  preloadedState?: PreloadedState<ReducerTypes & EmptyObject>
  store?: TStore
} & Omit<RenderOptions, 'wrapper'>

function renderWithProviders(ui: ReactElement, options?: CustomRenderOptions) {
  const { preloadedState } = options || {}

  const store =
    options?.store ||
    configureStore({
      reducer: {
        shoppingCart: shoppingCartSlice,
      },
      preloadedState,
    })

  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>
  }

  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

export { renderWithProviders };