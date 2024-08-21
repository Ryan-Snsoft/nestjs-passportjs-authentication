import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
    timestamps: true
})

export class User extends Document {
    @Prop()
    name: string
    
    @Prop({ required: true, unique: true })
    phone: string

    @Prop()
    email: string
    
    @Prop()
    password: string

    @Prop()
    verificationCode: string; // SMS验证码
}

export const UserSchema = SchemaFactory.createForClass(User);