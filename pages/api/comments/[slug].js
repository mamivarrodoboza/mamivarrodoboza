import dbConnect from '../../../lib/dbConnect';
import Comment from '../../../models/Comment';

export default async function handler(req, res) {
  const { method } = req;
  const commentSlug = req.query.slug;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const comments = await Comment.find({ slug: commentSlug });
        res.status(200).json({ success: true, data: comments });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
