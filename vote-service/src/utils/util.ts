/**
 * 获取数据库分页参数
 * @param query
 */
export function getLimitOffset(query) {
  const pageNo = +query.pageNo || 1;
  const limit = +query.pageSize || 10;
  const offset = (pageNo - 1) * limit;
  return {limit, offset};
}
