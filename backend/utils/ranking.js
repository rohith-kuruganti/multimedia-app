const calculateRelevanceScore = (file, query) => {
  const normalizedQuery = query.toLowerCase().trim();
  const fileName = file.originalName.toLowerCase();

  let score = 0;

  if (fileName === normalizedQuery) {
    score += 50;
  } else if (fileName.includes(normalizedQuery)) {
    score += 30;
  }

  const hasTagMatch = file.tags.some((tag) =>
    tag.toLowerCase().includes(normalizedQuery)
  );

  if (hasTagMatch) {
    score += 20;
  }

  score += Math.min(file.viewCount, 20);

  const ageInDays =
    (Date.now() - new Date(file.createdAt).getTime()) / (1000 * 60 * 60 * 24);

  if (ageInDays <= 1) {
    score += 10;
  } else if (ageInDays <= 7) {
    score += 5;
  }

  return score;
};

module.exports = {
  calculateRelevanceScore,
};
