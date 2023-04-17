import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  collection: 'User',
  // versionKey: false
})
export class User {
  @Prop({ required: true })
  name?: string;

  @Prop({ default: 'cleaner' })
  role?: string;

  @Prop({ type: Date, default: new Date() })
  createdAt?: Date;

  @Prop({ type: Date, default: new Date() })
  updatedAt?: Date;

  @Prop({ required: true, unique: true })
  email?: string;

  @Prop({ required: true })
  hash?: string;

  @Prop({ default: null })
  hashRt?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);