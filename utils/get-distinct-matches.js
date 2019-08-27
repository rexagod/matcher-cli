const getDistinctMatches = (string) => {
    if (isPair(string)) {
      const truncatedString = (string).substring(6);
      const truncatedObject = JSON.parse(truncatedString);
      if (matches.indexOf(truncatedObject) === -1
      && matches.length < truncatedObject.population) {
        matches.push(truncatedObject);
      }
    }
  };