import React from 'react'
import styled from 'styled-components'

const Stick = styled.section`
  width: 100%;
  border-radius: 25px;
  height: 3.125rem;
  background-color: #d9b38c;
  color: rgba(0,0,0,0.65);
  text-align: right;
  font-size: 40px;
  padding-right: 70px;
  line-height: 42px;
  box-sizing: border-box;
  font-family: 'Permanent Marker', cursive;
  box-shadow:
    0 0 0 .0625rem #d9b38c inset,
    0 0 0 0.125rem rgba(255,250,250, 0.25) inset,
    0 .1875rem 0 0 #ab8967,
    0 .1875rem 0 .0625rem rgba(0,0,0, 0.4),
    0 .1875rem .35rem .0625rem rgba(0,0,0, 0.5);
`

export const LpopStick = (props) => {
  return (
    <Stick>
      {props.currentName}
    </Stick>
  )
}
