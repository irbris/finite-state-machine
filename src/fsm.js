class FSM {

  constructor(config) {
    if (!config) throw new Error("config is missing");
    this.initialState = config.initial;
    this.states = config.states;
    this.state = config.initial;
    this.history = [];
    this.buffer = [];
  }

  getState() {
    return this.state;
  }

  changeState(state) {
    if (this.states[state]) {
      this.history.push(this.state);
      this.state = state;
      this.buffer = [];
    } else {
      throw new Error("state isn\'t exist")
    }
  }

  trigger(event) {
    let newState = this.states[this.state].transitions[event];
    if (newState) {
      this.changeState(newState);
    } else {
      throw new Error("event in current state isn\'t exist");
    }
  }

  reset() {
    this.changeState(this.initialState);
  }

  getStates(event) {
    if (!event) {
      return Object.keys(this.states);
    } else {
      const result = [];
      for (let key in this.states) {
        if (this.states[key].transitions[event]) {
          result.push(key);
        }
      } 
      return result;
    }
  }

  undo() {
    if (this.history.length) {
      this.buffer.push(this.state);
      this.state = this.history.pop();
      return true;
    } else {
      return false;
    }      
  }

  redo() {
    if (this.buffer.length) {
      this.history.push(this.state);
      this.state = this.buffer.pop();
      return true;
    } else {
      return false;
    }    
  }

  clearHistory() {    
    this.buffer = [];
    this.history = [];
  }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/