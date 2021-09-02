import mongoose from 'mongoose';

interface ActiveRoomAttrs {
  name: string;
  roomId: string;
}

interface ActiveRoomDoc extends mongoose.Document {
  name: string;
  roomId: string;
}

interface ActiveRoomModel extends mongoose.Model<ActiveRoomDoc> {
  build(attrs: ActiveRoomAttrs): ActiveRoomDoc;
}

const activeRoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    roomId: {
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

activeRoomSchema.statics.build = (attrs: ActiveRoomAttrs) => {
  return new ActiveRoom(attrs);
};

const ActiveRoom = mongoose.model<ActiveRoomDoc, ActiveRoomModel>(
  'ActiveRoom',
  activeRoomSchema
);

export { ActiveRoom };
