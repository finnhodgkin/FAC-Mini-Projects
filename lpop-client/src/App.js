import React, { Component } from 'react';
import styled from 'styled-components'

import {LpopStick, LpopGet, LpopAdd, LpopList, LpopReset} from './components/lpop-admin'
import {getUnchecked, check, uncheckAll, validateAdd, updateList, findById, toggleCheck, addName, removeName, generateId} from './lib/lpop/lpopHelpers'

const AppContainer = styled.section`
  max-width: 90%;
  width: 31.875rem;
  margin: 7rem auto;
`
const LpopAdmin = styled.section`
  overflow: hidden;
  border-radius: 1rem;
  margin-top: 3rem;
  box-shadow:
    0 0 0 .0625rem #31516a inset,
    0 0 0 0.125rem rgba(255,250,250, 0.25) inset,
    0 .3rem 0 0 #1e3547,
    0 .3rem 0 .0625rem rgba(0,0,0, 0.4),
    0 .3rem .5rem .0625rem rgba(0,0,0, 0.5);
`
const ControlContainer = styled.section`
  background-color: #31516a;
  text-align: center;
  width: 100%;
`
const CenterControls = styled.section`
  margin: 0 auto;
  display: inline-block;
`

class App extends Component {
  state = {
    currentName: 'Finn',
    names: [
      { name: 'Finn', id: 1, isChecked: true },
      { name: 'Tom', id: 2, isChecked: false },
      { name: 'Dick', id: 3, isChecked: false },
      { name: 'Harry', id: 4, isChecked: false },
    ],
    newName: '',
  }

  handleReset = (callback) => {
    const list = uncheckAll(this.state.names);
    callback ?
      this.setState({names: list}, callback) :
      this.setState({names: list})
  }

  handleToggleCheck = (id) => {
    const name = findById(this.state.names, id)
    const toggled = toggleCheck(name)
    const updated = updateList(this.state.names, toggled)
    this.setState({names: updated})
  }

  handleRemove = (id, event) => {
    event.preventDefault()
    event.stopPropagation()
    const updated = removeName(this.state.names, id)
    this.setState({names: updated})
  }

  handleAdd = (event) => {
    event.preventDefault()
    const id = generateId()
    const newName = { name: this.state.newName, id: id, isChecked: false }
    const names = addName(this.state.names, newName)
    this.setState({names})
  }

  handleEmptyAdd = (event) => event.preventDefault()

  handleInputChange = (event) => {
    this.setState({newName: event.target.value})
  }

  handlePop = () => {
    // If nothing to pop, don't try...
    if (!this.state.names[0]) return;
    const list = getUnchecked(this.state.names)
    // Reset automatically when no more unchecked
    if (!list[0]) return this.handleReset(this.handlePop)
    // Pick a random name and check it off the list
    const name = list[Math.floor(Math.random() * list.length)]
    const updatedList = updateList(this.state.names, check(name))
    this.setState({currentName: name.name, names: updatedList})
  }

  render() {
    const add = validateAdd(this.state.newName) ? this.handleAdd : this.handleEmptyAdd
    return (
      <AppContainer>
        <LpopStick currentName={this.state.currentName}/>
        <LpopAdmin>
          <ControlContainer>
            <CenterControls>
              <LpopGet handlePop={this.handlePop}/>
              <LpopReset handleReset={this.handleReset}/>
            </CenterControls>
          </ControlContainer>
          <LpopAdd
            handleAdd={add}
            handleInputChange={this.handleInputChange}
            newName={this.state.newName}/>
          <LpopList
            handleToggleCheck={this.handleToggleCheck}
            handleRemove={this.handleRemove}
            names={this.state.names}/>
        </LpopAdmin>
      </AppContainer>
    );
  }
}

export default App;
