import HttpError from '@wasp/core/HttpError.js'

export const getUserDataset = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { userId, pageNumber } = args;

  const pageSize = 8;
  const offset = (pageNumber - 1) * pageSize;

  const userDataset = await context.entities.UserDataset.findMany({
    where: { userId },
    select: {
      id: true,
      username: true,
      profilePicture: true,
      nationality: true
    },
    skip: offset,
    take: pageSize
  });

  return userDataset;
}