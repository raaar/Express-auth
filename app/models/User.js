const mongoose = global.APP.db;
const Schema = mongoose.Schema;


const userSchema = Schema({
  name: { type: String },
  googleId: { type: String },
  picture: { type: String }
});

userSchema.statics.getAll = async function() {
  const query = this.find({});
  return await query.exec();
};

// userSchema.statics.deleteUser = async function(id) {
//   const query = this.deleteOne({
//     _id: id
//   })

//   return await query.exec();
// }

userSchema.statics.findOrCreate = async function(profile) {
  const { displayName, id: googleId, photos } = profile;
  const img = photos[0].value || undefined;

  const query = await this.find({
    googleId
  });

  if(query.length > 0) {
    return query[0];
  }

  console.log("model", img);
  
  const newUser = new this({
    googleId,
    picture: img,
    name: displayName
  });

  await newUser.save();
  return newUser;
}

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;