const generalErrors = (res, err) => {
  if (err === 400) {
    return res
      .status(400)
      .json({ error: 'Missing fields in the request body' });
  }

  if (err === 500) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

const usersErrors = (res, err) => {
  if (err === 409) {
    return res.status(409).json({
      error: 'A user with the provided username/email already exists',
    });
  }

  if (err === 404) {
    return res.status(404).json({
      error: 'A user with the provided id does not exist',
    });
  }
};

module.exports = {
  generalErrors,
  usersErrors,
};
