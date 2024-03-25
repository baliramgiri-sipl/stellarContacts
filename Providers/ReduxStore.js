"use client";
import { store } from '@/redux/store'
import React from 'react'
import { Provider } from 'react-redux'
import QueryProvider from './QueryProvider'
import useSocket from '@/hooks/useSocket';

const ReduxStore = ({ children }) => {
    const socket = useSocket();
    return (
        <Provider store={store}>
            <QueryProvider > {children} </QueryProvider>
        </Provider>
    )
}

export default ReduxStore