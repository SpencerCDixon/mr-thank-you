import { h, Component } from 'preact';
import styled from 'styled-components';
import { media, font, fonts } from 'styles';

const Link = styled.a`
  ${font.primary}
  text-transform: uppercase;
  cursor: pointer;
  color: white;
  padding: 0 30px;
  ${media.handheld`
    padding: 0 10px;
  `}
  
`

export default Link;
