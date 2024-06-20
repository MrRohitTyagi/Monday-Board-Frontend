function generateUserPictureFallback(str = "") {
  return str.charAt(0) + str.charAt(str.length - 1);
}
export { generateUserPictureFallback };
