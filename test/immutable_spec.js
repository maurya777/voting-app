import { expect } from 'chai';
import { Map, List} from 'immutable';

describe('immutability', () => {
  describe('a number', () => {
    function increment(state) {
      return state + 1;
    }

    it('is immutable', () => {
      const state = 42;
      const newState = increment(state);
      expect(newState).to.equal(43);
      expect(state).to.equal(42);
    });
  });

  describe('a list', () => {
    function addMovie(state, movie) {
      return state.push(movie);
    }

    it('is immutable', () => {
      const state = List.of('movie 1', 'movie 2');
      const newState = addMovie(state, 'movie 3');
      expect(newState).to.equal(List.of('movie 1', 'movie 2', 'movie 3'));
      expect(state).to.equal(List.of('movie 1', 'movie 2'));
    });
  });
  
  describe('a tree', () => {
    function addEntry(state, entry) {
      return state.set('entries', state.get('entries').push(entry));
    }

    it('is immutable', () => {
      const state = Map({
        entries: List.of('movie 1', 'movie 2')
      });
      const newState = addEntry(state, 'movie 3');
      expect(newState).to.equal(Map({
        entries: List.of('movie 1', 'movie 2', 'movie 3')
      }));
      expect(state).to.equal(Map({
        entries: List.of('movie 1', 'movie 2')
      }));
    });
  });
});