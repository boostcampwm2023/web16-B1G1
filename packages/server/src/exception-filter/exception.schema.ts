import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Star } from '../star/schemas/star.schema';

@Schema({ strict: false })
export class Exception {}

export const ExceptionSchema = SchemaFactory.createForClass(Star);
