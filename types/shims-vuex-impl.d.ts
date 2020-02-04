import 'vuex';
import * as Items from '../store/entities/items';

declare module 'vuex' {
  type RootState = {
    Items: Items.S;
  };
  type RootGetters = Items.RG;
  type RootMutations = Items.RM;
  type RootActions = Items.RA;
}
