// @flow
import React, { Component } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import CircularOutline from '../CircularOutline';

type Props = {
  size: 'small' | 'medium' | 'large',
  color1: string,
  color2: string,
  showOutline: boolean,
  noPadding: boolean,
  children: React$Node,
};

type State = {
  isHovered: boolean,
};

class Button extends Component<Props, State> {
  static defaultProps = {
    size: 'medium',
    color1: COLORS.gray[800],
    color2: COLORS.gray[500],
    showOutline: true,
  };

  getButtonElem = size => {
    switch (size) {
      case 'small':
        return SmallButton;
      case 'medium':
        return MediumButton;
      case 'large':
        return LargeButton;
    }
  };

  render() {
    const {
      size,
      children,
      color1,
      color2,
      showOutline,
      ...delegated
    } = this.props;

    const Elem = this.getButtonElem(size);

    // Not using `viewBox` because I want the stroke width to be a constant
    // 2px regardless of SVG size.
    return (
      <Elem {...delegated}>
        <CircularOutline
          color1={color1}
          color2={color2}
          isShown={showOutline}
        />

        {children}
      </Elem>
    );
  }
}

const ButtonBase = styled.button`
  position: relative;
  border: 0;
  background: transparent;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  outline: none;

  &:active rect {
    stroke-width: 4;
  }
`;

const SmallButton = styled(ButtonBase)`
  padding: ${props => (props.noPadding ? '0px' : '0px 14px')};
  height: ${props => (props.noPadding ? 'auto' : '34px')};
  font-size: 14px;
`;

const MediumButton = styled(ButtonBase)`
  padding: ${props => (props.noPadding ? '0px' : '0px 20px')};
  height: ${props => (props.noPadding ? 'auto' : '38px')};
  font-size: 16px;
`;

const LargeButton = styled(ButtonBase)`
  padding: ${props => (props.noPadding ? '0px' : '0 32px')};
  height: ${props => (props.noPadding ? 'auto' : '44px')};
  font-size: 22px;
`;

export default Button;