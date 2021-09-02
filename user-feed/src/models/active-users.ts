import mongoose from 'mongoose';

interface ActiveUserAttrs {
  username: string;
  socketId: string;
}

interface ActiveUserDoc extends mongoose.Document {
  username: string;
  socketId: string;
}

interface ActiveUserModel extends mongoose.Model<ActiveUserDoc> {
  build(attrs: ActiveUserAttrs): ActiveUserDoc;
}

const activeUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    socketId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

activeUserSchema.statics.build = (attrs: ActiveUserAttrs) => {
  return new ActiveUser(attrs);
};

const ActiveUser = mongoose.model<ActiveUserDoc, ActiveUserModel>(
  'ActiveUser',
  activeUserSchema
);

export { ActiveUser };
