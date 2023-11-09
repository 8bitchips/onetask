import HttpError from '@wasp/core/HttpError.js'

export const searchUsers = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { query, nationality } = args;

  const users = await context.entities.UserDataset.findMany({
    where: {
      username: { contains: query },
      nationality: { equals: nationality }
    }
  });

  return users;
}