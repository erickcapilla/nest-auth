import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Session extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ default: Date.now })
  lastSession: Date;

  @Prop({ type: Object })
  location: {
    country_name: string;
    city: string;
    lat: number;
    lng: number;
  };
}

export const SessionSchema = SchemaFactory.createForClass(Session);
