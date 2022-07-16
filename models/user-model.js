import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true },
);

const Dataset = mongoose.models.users || mongoose.model('users', userSchema);
export default Dataset;
