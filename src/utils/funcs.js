const formatPostRes = data => {
  const res = [];

  for (let post of data) {
    const {
      id,
      user,
      title,
      content,
      imageUrl,
      publishedAt,
      createdAt,
      updatedAt,
      comments,
      categories,
    } = post;

    res.push({
      id,
      author: user,
      title,
      content,
      imageUrl,
      publishedAt,
      createdAt,
      updatedAt,
      comments,
      categories: categories.map(category => {
        return { id: category.id, name: category.name };
      }),
    });
  }
  return res;
};

const pagination = (pageNum, perPageNum) => {
  let page = parseInt(pageNum) - 1;
  let perPage = parseInt(perPageNum);

  if (isNaN(page)) page = 0;
  if (page < 0) page = 0;
  if (isNaN(perPage)) perPage = 10;
  if (perPage < 0) page = 0;

  return {
    skip: page * perPage,
    take: perPage,
  };
};

module.exports = { formatPostRes, pagination };
