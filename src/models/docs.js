const docModel = (uid, name, path, parent) => {
  const model = {
    createdAt: new Date(),
    createdBy: uid,
    lastAccessed: new Date(),
    name: name,
    updatedAt: new Date(),
    path: path,
    parent: parent,
  };

  return model;
};

export default docModel;
