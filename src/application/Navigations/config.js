import React from 'react'
import { DrawerActions } from '@react-navigation/native'

export const navigationRef = React.createRef()

export function toggleDrawer(routeName, params) {
    navigationRef.current.dispatch(DrawerActions.toggleDrawer())
}