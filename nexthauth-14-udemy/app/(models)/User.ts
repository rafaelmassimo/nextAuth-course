import mongoose, { Model, Schema, Types, model } from 'mongoose';

mongoose.connect(process.env.MONGODB_URI!)
mongoose.Promise = global.Promise



export type UserType = {
	id: Types.ObjectId;
	name: string;
	email: string;
	password: string;
};

type timestamps = {
	createdAt: string;
	updatedAt: string;
};

export type UserModel = Model<UserType & timestamps>;

const UserSchema = new Schema(
	{
		name: String,
        email: String,
        password: String,
	},
	{
		timestamps: true,
	},
);

//This way the way the the instructor decided to create the model 
const User = mongoose.models.User || mongoose.model<UserType & timestamps>('User', UserSchema);

// const User = model<UserType, UserModel>('User', UserSchema);

export default User;
