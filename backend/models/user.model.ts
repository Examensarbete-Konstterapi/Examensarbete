import mongoose, {Schema, InferSchemaType} from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
    },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
    required: true
    },
},
    {
    timestamps: true
    }
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidate: string) {
    return bcrypt.compare(candidate, this.password);
}


export type User = InferSchemaType<typeof UserSchema>;

export const UserModel = mongoose.model("User", UserSchema);

// export default mongoose.model("User", UserSchema);