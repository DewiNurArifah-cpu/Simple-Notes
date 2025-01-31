import React from "react";
import NoteList from "./NoteList";
import NoteInput from "./NoteInput";
import SearchBar from "./SearchBar";
import { getInitialData } from "../utils/index";


class NoteApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getInitialData(),
      searchTitle : ''
    }
  
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onArchivedHandler = this.onArchivedHandler.bind(this);
    this.onSearchTitleHandler = this.onSearchTitleHandler.bind(this);
  }
  
  onDeleteHandler(id) {
    const notes = this.state.notes.filter(note => note.id !== id);
    this.setState({ notes });
  }

  onArchivedHandler(id) {
    this.setState((prevState) => {
      return {
        notes : prevState.notes.map(note =>
          note.id === id ? { ...note, archived : !note.archived } : note)
      };
    });
  };

  onAddNoteHandler({ title, body, createdAt, archived }) {
    this.setState((prevState) => {
      return {
        notes: [
          ...prevState.notes,
          {
            id: +new Date(),
            title,
            body,
            createdAt,
            archived
          }
        ]
      };
    });
  };

  onSearchTitleHandler(searchedTitle) {
    this.setState(() => {
      return {
        searchTitle : searchedTitle.trim().toLowerCase()
      }
    });
  };
  
  render() {
    const activeNotes = this.state.notes.filter((note) => !note.archived);
    const archivedNotes = this.state.notes.filter((note) => note.archived);
    const searchedNotes = this.state.searchTitle ? 
    (this.state.notes.filter((note) => note.title.toLowerCase().includes(this.state.searchTitle.toLowerCase()))) : null;
    console.log(searchedNotes)

    return (
      <div className="note-app">
        <div className="note-app__header">
          <h1>Notes</h1>
          <SearchBar onChange = {this.onSearchTitleHandler}/>
        </div>
        <div className="note-app__body">
          <NoteInput onAddNote={this.onAddNoteHandler} />
          <article className="note-app__body__active">
            <h2>Catatan Aktif</h2>
            {
            searchedNotes !== null ? searchedNotes.length === 0 ? <p className="notes-list__empty-message">Tidak ada Catatan</p> : <NoteList notes={searchedNotes.filter((note => !note.archived))} onDelete={this.onDeleteHandler} onArchived={this.onArchivedHandler}/> : <NoteList notes={activeNotes} onDelete={this.onDeleteHandler} onArchived={this.onArchivedHandler} />
            }
          </article>
          <article className="note-app__body__archive">
            <h2>Catatan Arsip</h2>
            {
            searchedNotes !== null ? searchedNotes.length === 0 ? <p className="notes-list__empty-message">Tidak ada Catatan</p> : <NoteList notes={searchedNotes.filter((note => note.archived))} onDelete={this.onDeleteHandler} onArchived={this.onArchivedHandler}/> : <NoteList notes={archivedNotes} onDelete={this.onDeleteHandler} onArchived={this.onArchivedHandler} />
            }
          </article>
        </div>
      </div>
    );
  };
 };

export default NoteApp;