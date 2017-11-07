import { expect } from 'chai';
import { Map, fromJS } from 'immutable';
import reducer from '../src/reducer';

describe('reducer', () => {
  it('has initial state', () => {
    const action = { type: 'SET_ENTRIES', entries: ['movie 1'] };
    const newState = reducer(undefined, action);
    expect(newState).to.equal(fromJS({ entries: ['movie 1'] }));
  });
  it('handles SET_ENTRIES', () => {
    const state = Map();
    const action = {type: 'SET_ENTRIES', entries: ['movie 1']};
    const newState = reducer(state, action);
    expect(newState).to.equal(fromJS({entries: ['movie 1']}));
  });
  it('handles NEXT', () => {
    const state = fromJS({
      entries: ['movie 1', 'movie 2']
    });
    const action = { type: 'NEXT' };
    const newState = reducer(state, action);
    expect(newState).to.equal(fromJS({ 
      vote: {
        pair: ['movie 1', 'movie 2']
      },
      entries: [] 
    }));
  });
  it('handles VOTE', () => {
    const state = fromJS({
      vote: {
        pair: ['movie 1', 'movie 2']
      },
      entries: []
    });
    const action = { type: 'VOTE', entry: 'movie 1' };
    const newState = reducer(state, action);
    expect(newState).to.equal(fromJS({
      vote: {
        pair: ['movie 1', 'movie 2'],
        tally: {
          'movie 1': 1
        }
      },
      entries: []
    }));
  });
  it('can be used with reduce', () => {
    const actions = [
      { type: 'SET_ENTRIES', entries: ['movie 1', 'movie 2'] },
      { type: 'NEXT' },
      { type: 'VOTE', entry: 'movie 1' },
      { type: 'VOTE', entry: 'movie 2' },
      { type: 'VOTE', entry: 'movie 1' },
      { type: 'NEXT' }
    ];
    const finalState = actions.reduce(reducer, Map());

    expect(finalState).to.equal(fromJS({
      winner: 'movie 1'
    }));
  });
});