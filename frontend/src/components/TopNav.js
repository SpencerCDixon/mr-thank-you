import { h, Component } from 'preact';
import Logo from './Logo.js';

export default () => {
  return (
    <div style={{position: 'absolute', left: 40, top: 40}} >
      <Logo />
    </div>
  );
}
