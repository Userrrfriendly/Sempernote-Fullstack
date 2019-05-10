import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Context from "../../context/context";

import "./main.css";
import ExpandedNote from "../editor/expandedNote";
import NoteListItem from "./NoteListItem";
// import ExpandedNote from "../editor/expandedNote";

class Main extends Component {
  static contextType = Context;

  // componentDidUpdate() {
  //   console.log("<Main/> didUpdate");
  // }

  expandNote = (e, noteId) => {
    // console.log(`note with ID ${noteId} expanded`);
    this.context.setActiveNote(noteId);
  };

  render() {
    const renderNotes = this.context.globalState
      ? this.context.globalState.userNotes.map(note => {
          return (
            <NoteListItem
              key={note._id}
              name={note.title}
              updated={note.updatedAt}
              body={note.body}
              id={note._id}
              setActiveNote={this.context.setActiveNote}
              expandNote={this.expandNote.bind(this, note._id)}
            />
          );
        })
      : "no notes yet";

    const containerCssClass = this.context.activeNote
      ? "hide-on-small-only note-container"
      : "note-container";

    return (
      <main className="main-section l10">
        <div className={containerCssClass}>{renderNotes}</div>
        <Switch>
          {this.context.activeNote && (
            <Redirect exact from="/main/" to="/main/editor/" />
          )}
          <Route
            exact
            path="/main/"
            render={props => (
              <div className="fixed-action-btn">
                <button
                  title="create note"
                  aria-label="create note"
                  className="btn-floating btn-large green"
                >
                  <i className="material-icons">add</i>
                </button>
                {/* <button className="btn-floating btn-large red">
                  <i className="large material-icons">mode_edit</i>
                </button> */}
                {/* <ul>
                  <li>
                    <button className="btn-floating red">
                      <i className="material-icons">insert_chart</i>
                    </button>
                  </li>
                  <li>
                    <button className="btn-floating yellow darken-1">
                      <i className="material-icons">format_quote</i>
                    </button>
                  </li>
                  <li>
                    <button className="btn-floating green">
                      <i className="material-icons">publish</i>
                    </button>
                  </li>
                  <li>
                    <button className="btn-floating btn-large blue">
                      <i className="material-icons">note_add</i>
                    </button>
                  </li>
                  <li>
                    <button className="btn-floating btn-large green">
                      <i className="material-icons"> library_add</i>
                    </button>
                  </li>
                </ul> */}
              </div>
            )}
          />
          <Route
            exact
            path="/main/editor/"
            render={props => (
              <>
                {this.context.activeNote && (
                  <ExpandedNote
                    note={this.context.globalState.userNotes[0].body}
                  />
                )}
              </>
            )}
          />
        </Switch>
        {/* {this.context.activeNote && (
          <ExpandedNote note={this.context.globalState.userNotes[0].body} />
        )} */}
      </main>
    );
  }
}

export default Main;
