// Carfax Abbey: React in a .jsx file (source.js.jsx)
import React, { Component, Fragment, useState } from 'react';
import PropTypes from 'prop-types';

// One-line component
const Entry = (props) => <li className="entry">{props.page.place}</li>;

// Component with no logic outside JSX
const EntryList = ({ pages }) => (
  <ul className="entry-list">
    {pages.map((page) => (
      <Entry key={page.id} page={page} />
    ))}
  </ul>
);

// Hooks, conditional rendering and fragments
function Diary({ title, pages = [] }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <h1 data-boxes={50}>{title}</h1>
      <button type="button" onClick={() => setOpen(!open)} disabled={!pages.length}>
        {open ? 'Close the journal' : "Read the day's entry"}
      </button>
      {open && <EntryList pages={pages} />}
    </>
  );
}

Diary.propTypes = {
  title: PropTypes.string.isRequired,
  pages: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number, place: PropTypes.string })),
};

// Class component
export default class Archive extends Component {
  state = { total: 0, next: null };

  handleClick = (place) => {
    this.setState(({ total }) => ({ total: total + 1, next: place }));
  };

  render() {
    const { total, next } = this.state;
    return (
      <Fragment>
        <Diary
          title="Jonathan Harker's Journal"
          pages={[{ id: 1, place: 'Borgo Pass' }, { id: 2, place: 'Castle Dracula' }]}
        />
        <p className="status">
          Read {total} times, next: {next || 'nothing'} &mdash; Bistritz
        </p>
        <input value={next ?? ''} onChange={(e) => this.handleClick(e.target.value)} />
      </Fragment>
    );
  }
}
