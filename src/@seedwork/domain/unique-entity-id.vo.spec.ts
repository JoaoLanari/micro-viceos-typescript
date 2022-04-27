import InvalidUuidError from "../errors/invalid-uuid.error";
import UniqueEntityId from "./unique-entity-id.vo";
import { validate as uuidValidate } from 'uuid';

describe('UniqueEntityId Unit Tests', () => {
  it('should call validate and throw error when uuid is invalid', () => {
    const validdateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');
    expect(() => new UniqueEntityId('fake_id')).toThrow(new InvalidUuidError());
    expect(validdateSpy).toHaveBeenCalled();
  });

  it('should accept a uuid passed in contructor', () => {
    const validdateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');
    const uuid = '4a74433c-150d-4f5c-bc4b-a049b6dd8aca';
    const vo = new UniqueEntityId(uuid);
    expect(vo.id).toBe(uuid);
    expect(validdateSpy).toHaveBeenCalled();
  });

  it('should accept a uuid passed in contructor', () => {
    const validdateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');
    const vo = new UniqueEntityId();
    expect(uuidValidate(vo.id)).toBeTruthy();
    expect(validdateSpy).toHaveBeenCalled();
  });
});