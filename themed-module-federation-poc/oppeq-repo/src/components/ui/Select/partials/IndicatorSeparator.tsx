import React, { ReactElement } from 'react';

const getIndicator = (inverse = false) => {
  return {
    alignSelf: 'stretch',
    backgroundColor: inverse ? 'transparent' : '#666666',
    marginBottom: 8,
    marginTop: 8,
    width: 1,
  };
};

// Can't get the real interface setup properly, arrgh
// IndicatorSeparatorProps<IOption2, true>
interface FakeIndicatorSeparatorProps {
  selectProps: any;
  innerProps: any;
}

export const IndicatorSeparator = (props: FakeIndicatorSeparatorProps): ReactElement => {
  // IndicatorSeparatorProps<IOption2, true>
  const { inverse } = props.selectProps;

  return <span style={getIndicator(inverse)} {...props.innerProps} />;
};
