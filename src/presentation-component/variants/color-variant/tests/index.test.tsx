jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import ColorVariant from '..';

const optionTypes = [
  {
    name: 'group',
    presentation: 'Lựa chọn',
    values: [
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/804/thumb/1614573826.png?t=1623989410',
        name: 'Enif - Mira',
        option_value_id: 62,
        option_value_name: 'Enif - Mira',
        presentation: 'Enif - Mira'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/801/thumb/1614573571.png?t=1623992782',
        name: 'Enif - Electra',
        option_value_id: 63,
        option_value_name: 'Enif - Electra',
        presentation: 'Enif - Electra'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/803/thumb/1614573777.png?t=1623979172',
        name: 'Enif - Rana',
        option_value_id: 64,
        option_value_name: 'Enif - Rana',
        presentation: 'Enif - Rana'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/802/thumb/1614573588.png?t=1623989407',
        name: 'Enif - Capella',
        option_value_id: 65,
        option_value_name: 'Enif - Capella',
        presentation: 'Enif - Capella'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/825/thumb/1614574546.png?t=1623989407',
        name: 'Enif - Izar',
        option_value_id: 66,
        option_value_name: 'Enif - Izar',
        presentation: 'Enif - Izar'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/786/thumb/1614572718.png?t=1623993913',
        name: 'Vinde - Izar',
        option_value_id: 90,
        option_value_name: 'Vinde - Izar',
        presentation: 'Vinde - Izar'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/823/thumb/1614574499.png?t=1623993913',
        name: 'Vinde - Rana',
        option_value_id: 91,
        option_value_name: 'Vinde - Rana',
        presentation: 'Vinde - Rana'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/785/thumb/1614572690.png?t=1623993912',
        name: 'Vinde - Capella',
        option_value_id: 92,
        option_value_name: 'Vinde - Capella',
        presentation: 'Vinde - Capella'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/784/thumb/1614572669.png?t=1623993911',
        name: 'Vinde - Electra',
        option_value_id: 93,
        option_value_name: 'Vinde - Electra',
        presentation: 'Vinde - Electra'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/793/thumb/1614573175.png?t=1623993913',
        name: 'Vinde - Mira',
        option_value_id: 94,
        option_value_name: 'Vinde - Mira',
        presentation: 'Vinde - Mira'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/822/thumb/1614574476.png?t=1623993197',
        name: 'Larawag - Capella',
        option_value_id: 95,
        option_value_name: 'Larawag - Capella',
        presentation: 'Larawag - Capella'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/771/thumb/1614566738.png?t=1623993197',
        name: 'Larawag - Izar',
        option_value_id: 96,
        option_value_name: 'Larawag - Izar',
        presentation: 'Larawag - Izar'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/770/thumb/1614566705.png?t=1623993198',
        name: 'Larawag - Mira',
        option_value_id: 97,
        option_value_name: 'Larawag - Mira',
        presentation: 'Larawag - Mira'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/769/thumb/1614566679.png?t=1623993199',
        name: 'Larawag - Rana',
        option_value_id: 98,
        option_value_name: 'Larawag - Rana',
        presentation: 'Larawag - Rana'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/768/thumb/1614566654.png?t=1623993199',
        name: 'Larawag - Electra',
        option_value_id: 99,
        option_value_name: 'Larawag - Electra',
        presentation: 'Larawag - Electra'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/821/thumb/1614574446.png?t=1623991317',
        name: 'Omga - Electra',
        option_value_id: 100,
        option_value_name: 'Omga - Electra',
        presentation: 'Omga - Electra'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/767/thumb/1614566581.png?t=1623991318',
        name: 'Omga - Izar',
        option_value_id: 101,
        option_value_name: 'Omga - Izar',
        presentation: 'Omga - Izar'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/766/thumb/1614566542.png?t=1623991319',
        name: 'Omga - Mira',
        option_value_id: 102,
        option_value_name: 'Omga - Mira',
        presentation: 'Omga - Mira'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/765/thumb/1614566530.png?t=1623991319',
        name: 'Omga - Rana',
        option_value_id: 103,
        option_value_name: 'Omga - Rana',
        presentation: 'Omga - Rana'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/764/thumb/1614566511.png?t=1623991319',
        name: 'Omga - Capella',
        option_value_id: 104,
        option_value_name: 'Omga - Capella',
        presentation: 'Omga - Capella'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/799/thumb/1614573484.png?t=1623994547',
        name: 'Regulus - Rana',
        option_value_id: 105,
        option_value_name: 'Regulus - Rana',
        presentation: 'Regulus - Rana'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/824/thumb/1614574521.png?t=1623994547',
        name: 'Regulus - Mira',
        option_value_id: 106,
        option_value_name: 'Regulus - Mira',
        presentation: 'Regulus - Mira'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/800/thumb/1614573499.png?t=1623994547',
        name: 'Regulus - Izar',
        option_value_id: 107,
        option_value_name: 'Regulus - Izar',
        presentation: 'Regulus - Izar'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/798/thumb/1614573463.png?t=1623994547',
        name: 'Regulus - Capella',
        option_value_id: 108,
        option_value_name: 'Regulus - Capella',
        presentation: 'Regulus - Capella'
      },
      {
        color_code: null,
        color_image_url: null,
        image_url: 'https://upload.lixibox.com/system/pictures/files/000/056/797/thumb/1614573443.png?t=1623994547',
        name: 'Regulus - Electra',
        option_value_id: 109,
        option_value_name: 'Regulus - Electra',
        presentation: 'Regulus - Electra'
      }
    ]
  }
];

const component = (params = {}) => {
  const props = {
    item: optionTypes[0].values[0],
    type: optionTypes[0].name,
    selected: optionTypes[0].values[0].option_value_id,
    onSelect: jest.fn()
  };

  return <ColorVariant {...Object.assign({}, props, params)} />;
};

describe('ColorVariant', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
