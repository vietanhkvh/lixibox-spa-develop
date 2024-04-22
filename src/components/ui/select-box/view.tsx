import * as LAYOUT from '../../../style/layout';
import { isMobileVersion } from '../../../utils/responsive';
import { generateTestId } from 'utils/test-utils';
import { ISelectBoxProps, ISelectBoxState } from './model';
import Icon from '../icon';
import STYLE from './style';

export function renderComponent() {
  const { open, filteredList, list } = this.state as ISelectBoxState;
  const { title, style, search, disable, testId } = this.props as ISelectBoxProps;

  return false === isMobileVersion() ? (
    <div
      onMouseLeave={() => this.handleOnHover(false)}
      onMouseEnter={() => this.handleOnHover(true)}
      style={Object.assign({}, STYLE, open && STYLE.open, disable && STYLE.disable, style)}
      {...generateTestId(testId)}
    >
      {/** 1. Header */}
      <div
        onClick={() => this.toggleSelect(true)}
        style={Object.assign({}, LAYOUT.flexContainer.justify, LAYOUT.flexContainer.verticalCenter, STYLE.header)}
      >
        {/** 1.1. Header: text */}
        <div style={STYLE.header.text}>
          {filteredList.filter((item) => true === item.selected).length === 0
            ? title
            : list.filter((item) => item.selected)[0].title}
        </div>

        {/** 1.2. Header: icon */}
        <Icon style={STYLE.icon} innerStyle={STYLE.icon.inner} name={true === open ? 'angle-up' : 'angle-down'} />
      </div>

      {/** 2. Content */}
      {true === open && (
        /** item content */
        <div style={STYLE.content}>
          {/*2.1. Search */}
          <div
            style={Object.assign(
              {},
              LAYOUT.flexContainer.justify,
              LAYOUT.flexContainer.verticalCenter,
              STYLE.content.search
            )}
          >
            {/** 2.1.1. input search */}
            <input
              ref={(input) => input && input.focus()}
              onChange={this.searchFilter.bind(this)}
              placeholder={search}
              style={STYLE.content.search.input}
              type="text"
            />

            {/** 2.1.2. icon close */}
            <Icon
              onClick={this.closeSelectList.bind(this)}
              style={STYLE.icon}
              innerStyle={STYLE.icon.inner}
              name={'close'}
            />
          </div>

          {/** 2.2. List value */}
          <div style={STYLE.content.list}>
            <div style={STYLE.content.list.container}>
              {Array.isArray(filteredList) &&
                filteredList.map((item) => (
                  <div
                    onMouseEnter={() => this.hoverValue(item)}
                    onClick={() => this.selectValue(item)}
                    key={`select-box-${item.id}`}
                    style={Object.assign(
                      {},
                      LAYOUT.flexContainer.left,
                      STYLE.content.list.item,
                      item.hover && STYLE.content.list.item.hover,
                      true === item.selected && STYLE.content.list.item.selected
                    )}
                  >
                    {/** 2.2.1. text value */}
                    <div
                      style={Object.assign(
                        {},
                        STYLE.content.list.item.text,
                        true === item.selected && STYLE.content.list.item.text.selected
                      )}
                    >
                      {item.title}
                    </div>

                    {/** 2.2.2. icon value */}
                    {true === item.selected && <Icon style={STYLE.icon} innerStyle={STYLE.icon.inner} name={'check'} />}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div
      style={Object.assign({}, STYLE, open && STYLE.open, disable && STYLE.disable, style)}
      {...generateTestId(testId)}
    >
      <select
        onChange={(event) => this.selectValueMobile(event)}
        style={Object.assign(
          {},
          LAYOUT.flexContainer.justify,
          LAYOUT.flexContainer.verticalCenter,
          STYLE.selectBoxMobile
        )}
      >
        <option>{title}</option>
        {Array.isArray(filteredList) &&
          filteredList.map((item) => (
            <option key={`select-box-${item.id}`} selected={item.selected} value={item.id}>
              {item.title}
            </option>
          ))}
      </select>
      <Icon style={STYLE.iconMobile} innerStyle={STYLE.iconMobile.inner} name={'angle-down'} />
    </div>
  );
}
