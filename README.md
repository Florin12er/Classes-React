# React classes based components:

## there are 2 types of components functional and class based
## basically JAVASCRIPT classes

## just like normal components classes can have props and HTML code

## It can have private state (private function that can only be used in that classs)
## functional components don't have the *this* keyword but class based ones and the const one have it.

## Use functional components as much as possible only use class based components if you need them

## Functional components are used mostly do display static text in a page while class based components utilize more state.

## Class based components are more complicated than functional ones.

----

# Lifecycle Methods: 
## render() : 

### is the most used method, as the implies it renders the elements of the application

### The render method should not modify the state of your components just render them
### also the method doesn't interact with the browser
### is the only one that is required to use in a class for the class to be a component.

## componentDidUpdate() : 

### This method is run after a component re-renders. 
### You have to be careful what you code here because if the code constantly re-renders than in can cause an endless loop.

### In this method you should be updating anything that needs to be changed in response to either the
### DOM changing, or any states that you might want to act on upon change. For example, you’d want to refetch user data if the user changes.

## componentDidMount():

### This method runs after the component is mounted. 
### You should you this method to fetch data
### It can be used for anything that is reliant on the component such as drawing on a canvas element that you render.

## componentWillUnmount()

### the oppossite of componentDidMount():
### it should be used for cleanups

# Whatch the rest of the video : [video](https://www.youtube.com/watch?v=m_mtV4YaI8c) you were at minute 12:50
