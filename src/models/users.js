const usersModel = (email, name, uid) => {
  const model = {
    createdAt: new Date(),
    docs: [],
    email: email,
    image: null,
    lastLogin: new Date(),
    name: name,
    uid: uid,
    updatedAt: new Date(),
  };
  return model;
};
