"use client";
import { store } from '@/redux/store'
import React from 'react'
import { Provider } from 'react-redux'
import QueryProvider from './QueryProvider'

const ReduxStore = ({ children }) => {
    return (
        <Provider store={store}>
            <QueryProvider > {children} </QueryProvider>
        </Provider>
    )
}

export default ReduxStore