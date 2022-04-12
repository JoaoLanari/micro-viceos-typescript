import { Category } from "./category";

describe('Category Tests', (): void => {
  
  test('constructor of category', () => {
    const category: Category = new Category('Movie');
    expect(category.name).toBe('Movie');
  });
});