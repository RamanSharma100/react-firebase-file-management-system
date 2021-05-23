const docModel = (uid, name) => {
  const model = {
    createdAt: new Date(),
    createdBy: uid,
    lastAccessed: new Date(),
    name: name,
    updatedAt: new Date(),
  };

  return model;
};
