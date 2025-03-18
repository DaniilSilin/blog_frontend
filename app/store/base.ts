import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import { initializeStore } from "./store";

const makeProps = async ({
  callback,
  context,
}: {
  callback: any;
  context: any;
  addStoreToContext?: boolean;
}): Promise<any> => {
  const store = initializeStore({}, context);

  const nextCallback = callback && callback(store);
  const initialProps = (nextCallback && (await nextCallback(context))) || {};

  const state = store.getState();

  return {
    initialProps,
    initialState: state,
  };
};

const getStaticProps =
  (callback: any): GetStaticProps =>
  async (context: GetStaticPropsContext | GetServerSidePropsContext) => {
    const { initialProps, initialState } = await makeProps({
      callback,
      context,
    });
    return {
      ...initialProps,
      props: {
        ...initialProps.props,
        initialState,
      },
    } as any;
  };

const getServerSideProps =
  (callback: any): GetServerSideProps =>
  async (context) =>
    await getStaticProps(callback as any)(context);

const wrapper = {
  getStaticProps,
  getServerSideProps,
};

export default wrapper;
