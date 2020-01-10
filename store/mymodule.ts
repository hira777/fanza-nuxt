import { Module, VuexModule } from 'vuex-module-decorators'

@Module({
  name: 'mymodule',
  stateFactory: true,
  namespaced: true
})
export default class MyModule extends VuexModule {
  wheels = 2

  get axles() {
    return this.wheels / 2
  }
}
