export type Nil = null | undefined;
export type Optional<T> = T | Nil;

/**
 * Checks if a value is Nil and typeguards.
 * Nil is defined as either null or undefined.
 *
 * @export
 * @template T
 * @param {Optional<T>} value
 * @returns {value is Nil}
 */
export function isNil<T>(value: Optional<T>): value is Nil {
  if (value === null || value === undefined) {
    return true;
  }

  return false;
}

/**
 * Checks if a value exists by making sure it's not Nil.
 *
 * @export
 * @template T
 * @param {Optional<T>} value
 * @returns {value is T}
 */
export function exists<T>(value: Optional<T>): value is T {
  return !isNil(value);
}

/** Checks if function resolves to a value or Nil. */
export async function existsAsync<T>(resolver: () => Promise<Optional<T>>) {
  const result = await resolver();
  return exists(result);
}

/**
 * Checks if a value exists by making sure it's not Nil.
 * In case it does not, throws a NotFoundError.
 *
 * @export
 * @template T
 * @param {Optional<T>} value
 * @returns {T}
 */
export function mustExist<T>(value: Optional<T>): T {
  if (isNil(value)) {
    throw new Error('Value must exist!');
  }

  return value;
}

/**
 * Checks if all values in an array are not Nil.
 *
 * @export
 * @param {Array<any>} values
 * @returns
 */
export function existsBulk(values: Array<any>) {
  for (const value of values) {
    if (isNil(value)) {
      return false;
    }
  }

  return true;
}
