const getDistinctCorners = (string) => {
    if (isCorner(string)) {
      const truncatedString = (string).substring(8);
      const truncatedObject = JSON.parse(truncatedString);
      if (corners.indexOf(truncatedObject) === -1 && corners.length < 500) {
        corners.push(truncatedObject);
      }
    }
  };