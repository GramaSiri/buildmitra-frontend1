function generateRef(userName, floorCode, count) {
  return `${userName}-${floorCode}-${String(count).padStart(3, '0')}`;
}

export default generateRef;
