import { css } from 'styled-components'

export const colors = {
  blue: '#47b8e0',
  gold: '#ffc952',
  red: '#ff7473',
  black: '#34314c',
  green: '#21897E',
};

export const fonts = {
  primary: 'Montserrat, sans-serif',
};

export const font = {
  primary: `
    font-family: ${fonts.primary}
  `
};

export const flex = {
  row: `
    display: flex;
    flex-direction: row;
  `,
  col: `
    display: flex;
    flex-direction: column;
  `,
  alignCenter: `
    align-items: center;
  `,
  auto: `
    flex: 1;
  `,
};

export const media = {
  handheld: (...args) => css`
    @media (max-width: 420px) {
      ${css(...args)}
    }
  `
};
