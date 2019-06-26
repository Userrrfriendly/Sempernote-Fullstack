const User = require("../../models/user");
const Note = require("../../models/note");
const Notebook = require("../../models/notebook");
const Tag = require("../../models/tag");
const { dateToString } = require("../../helpers/date");

const notes = async notesIds => {
  try {
    const notes = await Note.find({ _id: { $in: notesIds } });
    // console.log(notes);
    return notes.map(note => {
      return transformNote(note);
    });
  } catch (err) {
    throw err;
  }
};

const user = async userId => {
  try {
    const user = await User.findById(userId);
    // console.log("merge/user()...");
    // console.log(user);
    return {
      ...user._doc,
      _id: user.id,
      password: null,
      username: user._doc.username,
      createdEvents: events.bind(this, user._doc.createdEvents),
      notes: notes.bind(this, user._doc.notes),
      notebooks: transformNotebooks.bind(this, user._doc.notebooks),
      tags: transformTags.bind(this, user._doc.tags)
    };
  } catch (err) {
    console.log("|merge.js - user()|" + err);
    throw err;
  }
};

const transformNote = note => {
  // console.log("transformNotebooks.bind(this, note.notebook)");

  return {
    ...note._doc,
    _id: note.id,
    createdAt: dateToString(note._doc.createdAt),
    updatedAt: dateToString(note._doc.updatedAt),
    creator: user.bind(this, note._doc.creator),
    notebook: transformSingleNotebook.bind(this, note._doc.notebook),
    tags: transformTags.bind(this, note._doc.tags)
  };
};

const transformNotebooks = async notebooksIDS => {
  const notebooks = await Notebook.find({ _id: { $in: notebooksIDS } });
  return notebooks.map(notebook => {
    return {
      ...notebook._doc,
      _id: notebook.id,
      creator: user.bind(this, notebook._doc.creator),
      notes: notes.bind(this, notebook._doc.notes)
    };
  });
};

//This transforms a single noteBOOK keep for now just for back up
const transformSingleNotebook = async singleNotebook => {
  const notebook = await Notebook.findById(singleNotebook);
  return {
    ...notebook._doc,
    _id: notebook.id,
    creator: user.bind(this, notebook._doc.creator),
    notes: notes.bind(this, notebook._doc.notes)
  };
};

//This transforms a single Tag
const tranformTag = async singleTag => {
  const tag = await Tag.findById(singleTag);
  // console.log("tranformTag + tag: " + tag);
  return {
    ...tag._doc,
    _id: tag.id,
    creator: user.bind(this, tag._doc.creator),
    notes: notes.bind(this, tag._doc.notes)
  };
};

const transformTags = async tagsIDS => {
  const tags = await Tag.find({ _id: { $in: tagsIDS } });
  return tags.map(tag => {
    return {
      ...tag._doc,
      _id: tag.id,
      creator: user.bind(this, tag._doc.creator),
      notes: notes.bind(this, tag._doc.notes)
    };
  });
};

const transformBooking = booking => {
  return {
    ...booking._doc,
    _id: booking.id,
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt)
  };
};

exports.transformNote = transformNote;
exports.transformNotebooks = transformNotebooks;
exports.transformSingleNotebook = transformSingleNotebook;
exports.tranformTag = tranformTag;
exports.transformTags = transformTags;
