import { createRef } from 'react';
import {
  NavigationAction,
  NavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

export const navigationRef =
  createRef<NavigationContainerRef<Record<string, any>>>();

export const getActiveRouteName = (state: any): string => {
  const route = state.routes[state.index];

  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }

  return route.name;
};

export const navigate = (route: string, params?: Record<string, any>) => {
  if (navigationRef.current) {
    return navigationRef.current.navigate(route, params);
  }
};

export const replace = (route: string, params?: Record<string, any>) => {
  dispatch(StackActions.replace(route, params));
};

export const dispatch = (action: NavigationAction) =>
  navigationRef.current?.dispatch(action);
