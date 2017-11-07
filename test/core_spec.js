import { expect } from 'chai';
import { Map, List} from 'immutable'; 
import { setEntries, next, vote } from '../src/core';

describe('aplication logic', () => {
  describe('setEntries', () => {
    it('adds the entries to the state', () => {
      const state = Map();
      const newState = setEntries(state, List.of('movie 1', 'movie 2'));
      expect(newState).to.equal(Map({
        entries: List.of('movie 1', 'movie 2')
      }));
    });
    it('converts to immutable', () => {
      const state = Map();
      const newState = setEntries(state, ['movie 1', 'movie 2']);
      expect(newState).to.equal(Map({
        entries: List.of('movie 1', 'movie 2')
      }));
    });
  });
  describe('next', () => {
    it('takes the next two entries under vote', () => {
      const state = Map({entries: List.of('movie 1', 'movie 2', 'movie 3')});
      const newState = next(state);
      expect(newState).to.equal(Map({
        vote: Map({pair: List.of('movie 1', 'movie 2')}),
        entries: List.of('movie 3')
      }));
    });
    it('puts winner of current vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('movie 1', 'movie 2'),
          tally: Map({
            'movie 1': 4,
            'movie 2': 2
          })
        }),
        entries: List.of('movie 3', 'movie 4', 'movie 5')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('movie 3', 'movie 4')
        }),
        entries: List.of('movie 5', 'movie 1')
      }));
    });
  
    it('puts both from tied vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('movie 1', 'movie 2'),
          tally: Map({
            'movie 1': 3,
            'movie 2': 3
          })
        }),
        entries: List.of('movie 3', 'movie 4', 'movie 5')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('movie 3', 'movie 4')
        }),
        entries: List.of('movie 5', 'movie 1', 'movie 2')
      }));
    });
    it('marks winner when just one entry left', () => {
      const state = Map({
        vote: Map({
          pair: List.of('movie 1', 'movie 2'),
          tally: Map({
            'movie 1': 4,
            'movie 2': 2
          })
        }),
        entries: List()
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        winner: 'movie 1'
      }));
    });
  });

  describe('vote', () => {
    it('creates a tally for the voted entry', () => {
      const state = Map({
        pair: List.of('movie 1', 'movie 2')
      });
      const newState = vote(state, 'movie 1');
      expect(newState).to.equal(Map({
        pair: List.of('movie 1', 'movie 2'),
        tally: Map({
          'movie 1': 1
        })
      }));
    });
    it('adds to the existing tally for the voted entry', () => {
      const state = Map({
        pair: List.of('movie 1', 'movie 2'),
        tally: Map({
          'movie 1': 1
        })
      });
      const newState = vote(state, 'movie 1');
      expect(newState).to.equal(Map({
        pair: List.of('movie 1', 'movie 2'),
        tally: Map({
          'movie 1': 2
        })
      }));
    });
  });  
});