import { switchResolver } from '../hook-form';
import * as Yup from 'yup';

describe('switchResolver', () => {
  const schemaGenerator = (switchValue: boolean) =>
    Yup.object().shape({
      field1: switchValue ? Yup.string().required('Field 1 is required') : Yup.string(),
      field2: Yup.number().required('Field 2 is required')
    });

  test('returns valid data when validation succeeds', async () => {
    const data = { field1: 'value', field2: 123 };
    const context = { resolverSwitch: true };
    const switchResolverFn = switchResolver(schemaGenerator);

    const result = await switchResolverFn(data, context);

    expect(result).toEqual({ values: data, errors: {} });
  });
});
