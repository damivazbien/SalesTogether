'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _web = require('./web3');

var _web2 = _interopRequireDefault(_web);

var _bytecodeFactory = require('./.build/bytecodeFactory.json');

var _bytecodeFactory2 = _interopRequireDefault(_bytecodeFactory);

var _abiFactory = require('./.build/abiFactory.json');

var _abiFactory2 = _interopRequireDefault(_abiFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var instance = new _web2.default.eth.Contract(_abiFactory2.default, '0x10556090f8F0e03D5A90aC49370d2a1A4a975CB9');

exports.default = instance;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtL2ZhY3RvcnkuanMiXSwibmFtZXMiOlsid2ViMyIsIlNhbGVzRmFjdG9yeWJ5dGVjb2RlIiwiY29tcGlsZWRGYWN0b3J5IiwiaW5zdGFuY2UiLCJldGgiLCJDb250cmFjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsQUFBTyxBQUFQLEFBQWlCLEFBQWpCOzs7O0FBQ0EsQUFBTyxBQUFQLEFBQWlDLEFBQWpDOzs7O0FBQ0EsQUFBTyxBQUFQLEFBQTRCLEFBQTVCOzs7Ozs7QUFFQSxJQUFNLFdBQVcsSUFBSSxjQUFLLEFBQUwsSUFBUyxBQUFiLEFBQ2IsQUFEYSwrQkFFYixBQUZhLEFBQWpCLEFBTUE7O2tCQUFlLEFBQWYiLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9tcm5vYm9keS9naXRodWIvU2FsZXNUb2dldGhlci9hcHAifQ==