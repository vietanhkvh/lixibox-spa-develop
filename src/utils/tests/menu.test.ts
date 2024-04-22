import { updateMenuSelect } from '../menu';

describe('updateMenuSelect', () => {
  let listMenu;
  let browse_nodes = [
    {
      id: 847,
      name: 'Beauty Box',
      vn_name: null,
      slug: 'beauty-box',
      menu_column: 0,
      sub_nodes: [
        {
          id: 848,
          name: 'New Beauty Box',
          vn_name: 'Box mới nhất',
          slug: 'new-beauty-box',
          menu_column: 0,
          sub_nodes: []
        },
        {
          id: 849,
          name: 'Bestsellers Beauty Box',
          vn_name: 'Box bán chạy nhất',
          slug: 'best-selling-beauty-box',
          menu_column: 0,
          sub_nodes: []
        }
      ]
    },
    {
      id: 840,
      name: 'Beauty',
      vn_name: 'Mua lẻ',
      slug: 'beauty',
      menu_column: 0,
      sub_nodes: []
    }
  ];

  describe(`when 'listMenu' is valid`, () => {
    describe(`when 'listMenu' contains valid ''browse_nodes`, () => {
      describe(`when 'idCategory' is found in the root level of 'listMenu'`, () => {
        test(`matched entry object is injected 'activeMenu' property`, () => {
          listMenu = { browse_nodes: JSON.parse(JSON.stringify(browse_nodes)) };
          const updatedList = updateMenuSelect(listMenu, 'beauty-box');
          expect(updatedList.browse_nodes[0].activeMenu).toEqual(true);
        });
      });

      describe(`when 'idCategory' is found in the nested level of 'listMenu'`, () => {
        test(`matched entry object is injected 'activeMenu' property`, () => {
          listMenu = { browse_nodes: JSON.parse(JSON.stringify(browse_nodes)) };
          const updatedList = updateMenuSelect(listMenu, 'best-selling-beauty-box');
          expect(updatedList.browse_nodes[0].sub_nodes[1].activeMenu).toEqual(true);
          expect(updatedList.browse_nodes[0].activeMenu).toEqual(true);
        });
      });

      describe(`when 'idCategory' is not found in 'listMenu'`, () => {
        test(`'listMenu' remains unmodified`, () => {
          listMenu = { browse_nodes: JSON.parse(JSON.stringify(browse_nodes)) };
          expect(updateMenuSelect(listMenu, 'beauty-box1')).toEqual(listMenu);
        });
      });
    });

    describe(`when 'listMenu' contains invalid ''browse_nodes`, () => {
      test(`'browse_nodes' is replaced with an empty array`, () => {
        listMenu = { browse_nodes: {} };
        expect(updateMenuSelect(listMenu, 'beauty-box')).toEqual({ browse_nodes: [] });
      });
    });
  });

  describe(`when 'listMenu' is invalid`, () => {
    test(`passes over 'listMenu'`, () => {
      listMenu = false;
      expect(updateMenuSelect(listMenu)).toEqual(listMenu);
    });
  });
});
