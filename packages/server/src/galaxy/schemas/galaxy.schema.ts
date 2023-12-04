import { Schema, SchemaFactory } from '@nestjs/mongoose';

export type GalaxyDocument = Galaxy & Document;

// 유연한 속성 추가, 삭제를 위해 strict: false 옵션을 추가하고 Prop() 데코레이터를 사용하지 않음
@Schema({ strict: false })
export class Galaxy {}

export const GalaxySchema = SchemaFactory.createForClass(Galaxy);
