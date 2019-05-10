const User = require("../../models/user");

const { transformNotebooks } = require("./merge");
// const { transformNotebooks, transformNote, events, notes } = require("./merge");

module.exports = {
  user: async args => {
    const user = await User.findById(args.userId);
    return {
      ...user._doc,
      _id: user.id,
      email: user.email,
      // notes: notes.bind(this, user._doc.notes),
      password: null,
      notebooks: transformNotebooks.bind(this, user._doc.notebooks)
    };
  }
};
