import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps: true
})

export class User {
    @Prop()
    name: string
    
    @Prop({ unique: [true, 'Phone Number Exists'] })
    phone: string

    @Prop({ unique: [true, 'Email Exists'] })
    email: string
    
    @Prop()
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User);