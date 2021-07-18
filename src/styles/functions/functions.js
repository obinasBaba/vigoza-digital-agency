import { css } from "styled-components";


export function pxToRm(value: number, fontSizeBase: number = 16){
  return (value * fontSizeBase) + 'rem';
}