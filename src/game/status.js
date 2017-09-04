const $dom = $('.control>span');
const state = {
  RUNING: 0,
  PARSEING: 1,
  STOPING: 2
};

class Status {
  constructor(){
    this._state = state.STOPING;
  }

  set state(val) {
    switch (val) {
      case state.RUNING:
        $dom.eq(0).hide();
        $dom.filter(':eq(1),:eq(2)').show();
        break;
      case state.PARSEING:
        $dom.eq(1).hide();
        $dom.filter(':eq(0),:eq(2)').show();
        break;
      case state.STOPING:
        $dom.filter(':eq(1),:eq(2)').hide();
        $dom.eq(0).show();
        break;
    }

    this._state = val;
  }

  get state() {
    return this._state;
  }
}


export {state}
export default new Status()
