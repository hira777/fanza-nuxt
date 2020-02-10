import { shallowMount } from '@vue/test-utils';
import FHeader from '@/components/FHeader/index.vue';

const createMocks = ({ routeQuery }: { routeQuery?: {} } = {}) => {
  return {
    $route: {
      query: routeQuery || {}
    },
    $router: {
      push: jest.fn()
    }
  };
};

describe('FHeader', () => {
  test('テキストフィールドに何もレンダリングしない', () => {
    const wrapper = shallowMount(FHeader, { mocks: createMocks() });
    const inputEl = wrapper.find('input').element as HTMLInputElement;
    expect(inputEl.value).toBe('');
  });

  test('テキストフィールドに keyowrd クエリパラメータをレンダリングする', () => {
    const wrapper = shallowMount(FHeader, {
      mocks: createMocks({
        routeQuery: {
          keyword: 'fanza',
          page: 10
        }
      })
    });
    const inputEl = wrapper.find('input').element as HTMLInputElement;
    expect(inputEl.value).toBe('fanza');
  });

  describe('検索機能', () => {
    // 共通処理を切り出したが、わかりづらい気もする。
    // また、月日が経ったらこの共通処理の役割を忘れそう。
    const getWrapper = () => {
      const mocks = createMocks();
      const wrapper = shallowMount(FHeader, { mocks });
      return {
        wrapper,
        mocks,
        mockRouter: mocks.$router
      };
    };

    test('入力されたキーワードと keyowrd クエリパラメータが同じ状態で検索ボタンを押下した場合、URL 遷移しない', () => {
      const { wrapper, mockRouter } = getWrapper();
      const button = wrapper.find('button');

      button.trigger('click');
      expect(mockRouter.push).toHaveBeenCalledTimes(0);
    });

    test('入力されたキーワードと keyowrd クエリパラメータが異なる状態で検索ボタンを押下した場合、URL 遷移する', () => {
      const { wrapper, mockRouter } = getWrapper();
      const input = wrapper.find('input');

      input.setValue('fanza');
      const button = wrapper.find('button');
      button.trigger('click');
      expect(mockRouter.push).toHaveBeenCalledWith(
        '/?keyword=fanza',
        expect.any(Function)
      );
    });

    test('入力されたキーワードと keyowrd クエリパラメータが異なる状態かつ検索フィールド上で enter ボタンを押下した場合、URL 遷移する', () => {
      const { wrapper, mockRouter } = getWrapper();
      const input = wrapper.find('input');

      input.setValue('fanza');
      input.trigger('keydown.up');
      expect(mockRouter.push).toHaveBeenCalledTimes(0);

      input.trigger('keydown.enter');
      expect(mockRouter.push).toHaveBeenCalledWith(
        '/?keyword=fanza',
        expect.any(Function)
      );
    });

    test('遷移する URL に半角全角スペースが含まれている場合、それらが %20 に変換された URL に遷移する', () => {
      const { wrapper, mockRouter } = getWrapper();
      const input = wrapper.find('input');

      input.setValue('fanza　dmm DMM');
      input.trigger('keydown.enter');
      expect(mockRouter.push).toHaveBeenCalledWith(
        '/?keyword=fanza%20dmm%20DMM',
        expect.any(Function)
      );
    });
  });
});
