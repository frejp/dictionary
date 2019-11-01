## State managment

useContext and useReducer instead of Redux.

The app state is not complex enough to motivate Redux.
If we did -not- have useContext and useReducer I would use
Redux. The benefits of useReducer is:

UseReducer is preferred when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one.

https://reactjs.org/docs/hooks-reference.html#usereducer

And the benefits with useContext particularly for this app is that we don't have to do that
awful prop drilling.

## Styled components

Lovely framework. Very fast to work with.
And makes the code more readable (mainly because you have to power to name our markup)

##Testing

Using testing library. Testing library is based on a specific philosophy. See https://testing-library.com/
Writing unit test AND integration test. Integration probably gives more value. This notion comes from the famous and discussed quote ‘Write tests. Not too many. Mostly integration’

##ACCESSIBILITY

The app should be accessible.

##CD

Travis Pipeline runs tests, builds and deploys application in the 'cloud'. So all the cool words.
But its actually quite handy, automation is always nice if ur lazy.
And running your code on a different enviroment besides your local machine is a good confirmation
that the code might work.

Live:
http://frejp.github.io/dictionary

Travis build:

https://travis-ci.com/frejp/dictionary

##Todo. This are some things that could be improved.

Tests

Add more unit tests
Add integration tests
And maybe perhaps E2E test (if u feel like having fun)

CSS

Add som design tokens and/or a theme.
for more consistent css value and cleaner css code.

## How long did it take?

Around 4 days.




Around 4 days.


