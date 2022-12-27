module.exports = (temp, user) => {
  let output = temp.replace(/{%USERNAME%}/g, user.userName);
  output = output.replace(/{%DESCRIPTION%}/g, user.description);
  output = output.replace(/{%FROM%}/g, user.from);
  output = output.replace(/{%ID%}/g, user.id);
  if (user.profilePhoto) {
    output = output.replace(/{%HAS_PHOTO%}/g, 'has-photo');
  } else if (!user.profilePhoto) {
    output = output.replace(/{%HAS_PHOTO%}/g, 'user has no photo');
  }
  return output;
};
