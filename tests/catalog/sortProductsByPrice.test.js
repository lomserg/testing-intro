const products = require("../../src/data/products");
const { sortProductsByPrice } = require("../../src/catalog");

describe("sortProductsByPrice", () => {
  test("все товары с 'asc' сортируются как [3, 6, 5, 4, 2, 1]", () => {
    expect(sortProductsByPrice(products, "asc").map((p) => p.id)).toEqual([
      3, 6, 5, 4, 2, 1,
    ]);
  });
  test("все товары без направления сортируются как [3, 6, 5, 4, 2, 1]", () => {
    expect(sortProductsByPrice(products).map((p) => p.id)).toEqual([
      3, 6, 5, 4, 2, 1,
    ]);
  });
  test("товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]", () => {
    expect(
      sortProductsByPrice(
        products.filter((p) => p.id === 3 || p.id === 4 || p.id === 1),

        "asc",
      ).map((p) => p.id),
    ).toEqual([3, 4, 1]);
  });
  test("все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]", () => {
    expect(
      sortProductsByPrice(
        products,

        "desc",
      ).map((p) => p.id),
    ).toEqual([1, 2, 4, 5, 6, 3]);
  });
  test("товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]", () => {
    expect(
      sortProductsByPrice(
        products.filter((p) => p.id === 3 || p.id === 1 || p.id === 4),

        "desc",
      ).map((p) => p.id),
    ).toEqual([1, 4, 3]);
  });

  test("товары [5, 2, 6] c 'desc' сортируются как  [2, 5, 6]", () => {
    expect(
      sortProductsByPrice(
        products.filter((p) => p.id === 5 || p.id === 2 || p.id === 6),

        "desc",
      ).map((p) => p.id),
    ).toEqual([2, 5, 6]);
  });
  test("'asc' не меняет исходный массив [1, 3, 4]", () => {
    const originalProducts = products.filter(
      (p) => p.id === 1 || p.id === 3 || p.id === 4,
    );
    const copyProducts = originalProducts.slice();
    sortProductsByPrice(originalProducts, "asc");
    expect(originalProducts).toEqual(copyProducts);
  });
  test("'desc' не меняет исходный массив [1, 3, 4]", () => {
    const originalProducts = products.filter(
      (p) => p.id === 1 || p.id === 3 || p.id === 4,
    );
    const copyProducts = originalProducts.slice();
    sortProductsByPrice(originalProducts, "desc");
    expect(originalProducts).toEqual(copyProducts);
  });

  test("направление по умолчанию не меняет исходный массив всех товаров", () => {
    const copyProducts = products.slice();
    sortProductsByPrice(products);
    expect(products).toEqual(copyProducts);
  });
});
