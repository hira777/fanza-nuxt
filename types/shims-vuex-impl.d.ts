import 'vuex';
import * as SearchSettings from '../store/app/searchSettings';
import * as Items from '../store/entities/items';

declare module 'vuex' {
  type RootState = {
    SearchSettings: SearchSettings.S;
    Items: Items.S;
  };
  type RootGetters = SearchSettings.RG & Items.RG;
  type RootMutations = SearchSettings.RM & Items.RM;
  type RootActions = SearchSettings.RA & Items.RA;
}
