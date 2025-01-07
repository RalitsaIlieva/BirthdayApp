const getGifts = (giftsData) => async () => {

    const result = await giftsData.getAllGifts();

    if (!result[0]) {
      return null;
    }
    return result;
  };

export default {
    getGifts
};
