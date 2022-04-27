import { Category, CategoryProperties } from "./category";
import { omit } from 'lodash';
import UniqueEntityId from "../../../@seedwork/domain/unique-entity-id.vo";

describe('Category Tests', (): void => {
  
  test('constructor of category', () => {
    let category: Category = new Category({ name: 'Movie' });
    let props = omit(category.props, 'created_at');
    expect(props).toStrictEqual({
      name: 'Movie',
      description: null,
      is_active: true,
    });
    expect(category.props.created_at).toBeInstanceOf(Date);
    
    let created_at = new Date();
    category = new Category({ 
      name: 'Movie',
      description: 'some description',
      is_active: false,
      created_at
    });
    expect(category.props).toStrictEqual({ 
      name: 'Movie',
      description: 'some description',
      is_active: false,
      created_at,
    });

    category = new Category({ 
      name: 'Movie',
      description: 'other description',
    });
    expect(category.props).toMatchObject({ 
      name: 'Movie',
      description: 'other description',
    });

    category = new Category({ 
      name: 'Movie',
      is_active: true,
    });
    expect(category.props).toMatchObject({ 
      name: 'Movie',
      is_active: true,
    });

    category = new Category({ 
      name: 'Movie',
      created_at,
    });
    expect(category.props).toMatchObject({ 
      name: 'Movie',
      created_at,
    });
  });

  test('id field', () => {
    type CategoryData = {
      props: CategoryProperties,
      id?: UniqueEntityId,
    }
    const data: CategoryData[] = [
      { props: { name: 'Movie' } },
      { props: { name: 'Movie' }, id: null },
      { props: { name: 'Movie' }, id: undefined },
      { props: { name: 'Movie' }, id: new UniqueEntityId() },
    ];
    
    data.forEach((i: CategoryData) => {
      const category: Category =  new Category(i.props, i.id as any);
      expect(category.id).not.toBeNull();
    });
  });

  test('getter of name prop', () => {
    const category: Category = new Category({ name: 'Movie' });
    expect(category.name).toBe('Movie');
  });

  test('getter and setter of description prop', () => {
    let category: Category = new Category({ name: 'Movie' });
    expect(category.description).toBeNull();

    category = new Category({ 
      name: 'Movie', 
      description: 'some description' 
    });
    expect(category.description).toBe('some description');

    category = new Category({ name: 'Movie' });

    category["description"] = 'other description';
    expect(category.description).toBe('other description');

    category["description"] = undefined;
    expect(category.description).toBeNull();

    category["description"] = null;
    expect(category.description).toBeNull();
  });

  test('getter and setter of is_active prop', () => {
    let category: Category = new Category({ name: 'Movie' });
    expect(category.is_active).toBeTruthy();

    category = new Category({ 
      name: 'Movie', 
      is_active: true
    });
    expect(category.is_active).toBeTruthy();

    category = new Category({ 
      name: 'Movie', 
      is_active: false
    });
    expect(category.is_active).toBeFalsy();

    category = new Category({ name: 'Movie' });

    category["is_active"] = false;
    expect(category.is_active).toBeFalsy();

    category["is_active"] = undefined;
    expect(category.is_active).toBeTruthy();

    category["is_active"] = null;
    expect(category.is_active).toBeTruthy();
  });

  test('getter and setter of created_at prop', () => {
    let category: Category = new Category({ name: 'Movie' });
    expect(category.created_at).toBeInstanceOf(Date);

    let created_at = new Date()
    category = new Category({ name: 'Movie', created_at });
    expect(category.created_at).toBe(created_at);

  });
});