import bcrypt from 'bcrypt';
import dbConnect from '../../lib/dbConnect';
import Users from '../../models/user-model';

export default async function handler(req, res) {
  await dbConnect();
  const { email, password } = req.body;
  const userExist = await Users.findOne({ email });
  if (userExist) {
    res.status(200).json({ message: 'Ez az email cím már regisztrálva van!' });
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new Users({ email, password: hashedPassword });
  await user.save();
  res.status(200).json({ message: 'Sikeres regisztráció!' });
}
