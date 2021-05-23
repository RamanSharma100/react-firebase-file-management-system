const fileModel = (uid, parent, data, name) => {
  const model = {
    createdAt: new Date(),
    createdBy: uid,
    data: data,
    name: name,
    parent: parent,
    updatedAt: new Date(),
  };

  return model;
};
