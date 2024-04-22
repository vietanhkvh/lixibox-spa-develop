jest.mock('../../../../utils/auth', () => ({
  auth: {
    loggedIn: () => true
  }
}));
import { reduxRender } from 'utils/test-utils';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { SIGN_IN_STATE } from 'constants/application/global';
import { discussionResponse } from 'test/sample/api/discussion';
import ProductDiscussion from '..';
import ProductDiscussionComponent from '../component';

const component = (params = {}) => {
  const props = {
    productId: '1',
    addDiscussion: jest.fn(),
    addDiscussionComment: jest.fn(),
    fetchDiscussionsBoxes: jest.fn(),
    openModal: jest.fn(),
    isSticky: false,
    perPage: 10,
    scrollId: 0,
    isOnModal: false
  };

  return <ProductDiscussion {...Object.assign({}, props, params)} />;
};

describe('ProductDiscussion', () => {
  const resizeWindow = (width, height) => {
    global.innerWidth = width;
    global.innerHeight = height;
    expect(window.innerWidth).toBe(width);
    expect(window.innerHeight).toBe(height);
  };

  test(`renders desktop view`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });

  test(`render loading mobile view`, () => {
    resizeWindow(390, 844);
    reduxRender(component(), { initialState: {} });
    const loading = document.getElementsByClassName('loadingContainer')[0];
    expect(loading).toBeInTheDocument();
  });

  test(`render mobile view`, () => {
    resizeWindow(390, 844);
    reduxRender(component({ isOnModal: true }), { initialState: {} });
    const discussitonBtn = screen.getByText(`Đặt câu hỏi đầu tiên cho sản phẩm này`);
    expect(discussitonBtn).toBeInTheDocument();
  });

  test(`submit discussion flow in mobile`, async () => {
    resizeWindow(1600, 1000);
    const user = userEvent.setup();
    const discussionStore = {
      boxDiscussions: { '1735530918': { ...discussionResponse } },
      isAddDiscussionSuccess: false,
      isFetchDiscussionSuccess: false,
      isLoadingFetchBoxDiscussion: true,
      isAddDiscussionCommentSuccess: false,
      isAddingDiscussion: false
    };
    const addDiscussion = jest.fn(),
      addDiscussionComment = jest.fn(),
      fetchDiscussionsBoxes = jest.fn();
    const props = {
      authStore: {
        signInStatus: SIGN_IN_STATE.LOGIN_SUCCESS
      },
      isOnModal: false,
      perPage: 10,
      productId: 'chacott-for-professionals-cleansing-water-500ml',
      scrollId: 'product-detail-discussion',
      addDiscussion,
      addDiscussionComment,
      fetchDiscussionsBoxes
    };

    const { rerender } = reduxRender(<ProductDiscussionComponent {...props} discussionStore={discussionStore} />, {
      inititalState: {}
    });
    rerender(
      <ProductDiscussionComponent
        {...props}
        discussionStore={Object.assign({}, discussionStore, { isFetchDiscussionSuccess: true })}
      />
    );

    const inputEle = document.getElementById('box-detail-discussion-input');
    expect(inputEle).toBeInTheDocument();
    const txtVal = 'Hello,Hello,Hello,Hello,Hello';
    await user.type(inputEle, `${txtVal}{enter}`);
    expect(inputEle).toHaveValue(txtVal);

    const submitBtn = screen.getByText('Gửi');
    expect(submitBtn).toBeInTheDocument();
    await user.click(submitBtn);
    expect(addDiscussion).toBeCalled();

    const replyBtn = screen.getAllByText('Trả lời')[0];
    expect(replyBtn).toBeInTheDocument();
    await user.click(replyBtn);
    await user.type(inputEle, `${txtVal}{enter}`);
    await user.click(submitBtn);
    expect(addDiscussionComment).toBeCalled();
  });
});
