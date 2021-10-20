import { StyledAutocomplete } from '../StyledAutocomplete';
import * as React from 'react';
import renderer from 'react-test-renderer';


jest.useFakeTimers()
it(`renders StyledAutocomplete correctly`, () => {
  const tree = renderer.create(<StyledAutocomplete/>).toJSON();

  expect(tree).toMatchSnapshot();
});
