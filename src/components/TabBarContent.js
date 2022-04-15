import {View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import {Icon_data} from '../data';
import {Transition, Transitioning} from 'react-native-reanimated';
import {COLORS} from '../assets/constant/Theme';
import styled from 'styled-components/native';

const TabContainer = styled.TouchableWithoutFeedback``;
const TabBackground = styled(Transitioning.View)`
  flex: auto;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  background-color: ${props => (props.focused ? '#7f7fff' : 'transparent')};
  border-radius: 12.5px;
  margin: 10px;
  height: 40px;
`;
const TabBarIcon = styled.Image`
  width: ${props => (props.focused ? '21px' : '28px')};
  height: ${props => (props.focused ? '21px' : '28px')};
  tint-color: ${props => (props.focused ? 'white' : '#525C67')};
`;
const TabBarlabel = styled.Text`
  color: ${props => (props.focused ? 'white' : '#525C67')};
  letter-spacing: 2px;
  font-size: 17px;
  text-transform: capitalize;
  font-family: Poppins-SemiBold;
  margin-top: 3px;
`;

export default function TabBarContent({label, accessibilityState, onPress}) {
  let focused = accessibilityState.selected;
  let icon = focused
    ? Icon_data.icons[`${label}focused`]
    : Icon_data.icons[label];

  const ref = React.useRef(null);

  const transition = (
    <Transition.Sequence>
      <Transition.Out type="fade" durationMs={0} />
      <Transition.Change interpolation="easeInOut" durationMs={250} />
      <Transition.In type="fade" durationMs={0} />
    </Transition.Sequence>
  );

  const animateTab = () => {
    ref.current.animateNextTransition();
    onPress();
  };

  return (
    <TabContainer onPress={() => animateTab()}>
      <TabBackground
        label={label}
        focused={focused}
        transition={transition}
        ref={ref}>
        <TabBarIcon source={icon} focused={focused} />
        {focused && <TabBarlabel focused={focused}>{label}</TabBarlabel>}
      </TabBackground>
    </TabContainer>
  );
}
