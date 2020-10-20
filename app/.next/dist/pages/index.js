'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _factory = require('../ethereum/factory');

var _factory2 = _interopRequireDefault(_factory);

var _semanticUiReact = require('semantic-ui-react');

var _Layout = require('../components/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _routes = require('../routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/mrnobody/github/SalesTogether/app/pages/index.js?entry';


var CampaignIndex = function (_Component) {
    (0, _inherits3.default)(CampaignIndex, _Component);

    function CampaignIndex() {
        (0, _classCallCheck3.default)(this, CampaignIndex);

        return (0, _possibleConstructorReturn3.default)(this, (CampaignIndex.__proto__ || (0, _getPrototypeOf2.default)(CampaignIndex)).apply(this, arguments));
    }

    (0, _createClass3.default)(CampaignIndex, [{
        key: 'renderCampaigns',
        value: function renderCampaigns() {

            // const items = this.props.campaigns.map(address => {
            //     return {
            //         header: address,
            //         description: (<Link route={ `/campaigns/${address}` }>
            //             <a>View Campaign</a>
            //         </Link>),
            //         fluid: true
            //     }
            // });


            var items = [{
                header: 'Project Report - April',
                description: 'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
                meta: 'ROI: 30%'
            }, {
                header: 'Project Report - May',
                description: 'Bring to the table win-win survival strategies to ensure proactive domination.',
                meta: 'ROI: 34%'
            }, {
                header: 'Project Report - June',
                description: 'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
                meta: 'ROI: 27%'
            }];

            return _react2.default.createElement(_semanticUiReact.Card.Group, { items: items, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 51
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_Layout2.default, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 56
                }
            }, _react2.default.createElement('div', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 57
                }
            }, _react2.default.createElement('h3', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 59
                }
            }, 'Open Campaigns'), _react2.default.createElement(_routes.Link, { route: '/campaigns/new', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 61
                }
            }, _react2.default.createElement('a', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 62
                }
            }, _react2.default.createElement(_semanticUiReact.Button, { floated: 'right', content: 'Create Campaign', icon: 'add circle', primary: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 63
                }
            }))), this.renderCampaigns()));
        }
    }], [{
        key: 'getInitialProps',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var campaigns;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                campaigns = []; //await factory.methods.getDeployedSales().call();

                                return _context.abrupt('return', { campaigns: campaigns });

                            case 2:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getInitialProps() {
                return _ref.apply(this, arguments);
            }

            return getInitialProps;
        }()
    }]);

    return CampaignIndex;
}(_react.Component);

exports.default = CampaignIndex;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiZmFjdG9yeSIsIkNhcmQiLCJCdXR0b24iLCJMYXlvdXQiLCJMaW5rIiwiQ2FtcGFpZ25JbmRleCIsIml0ZW1zIiwiaGVhZGVyIiwiZGVzY3JpcHRpb24iLCJtZXRhIiwicmVuZGVyQ2FtcGFpZ25zIiwiY2FtcGFpZ25zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFTOzs7O0FBQ2hCLEFBQU8sQUFBYTs7OztBQUNwQixBQUFTLEFBQU07O0FBQ2YsQUFBTyxBQUFZOzs7O0FBQ25CLEFBQVMsQUFBWTs7Ozs7OztJLEFBR2Y7Ozs7Ozs7Ozs7OzBDQVFnQixBQUdkOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTs7O2dCQUFNO3dCQUNGLEFBQ1UsQUFDUjs2QkFGRixBQUdJLEFBQ0Y7c0JBTFEsQUFDVixBQUlRO0FBSlIsQUFDRSxhQUZRO3dCQU9WLEFBQ1UsQUFDUjs2QkFGRixBQUdJLEFBQ0Y7c0JBWFEsQUFPVixBQUlRO0FBSlIsQUFDRTt3QkFLRixBQUNVLEFBQ1I7NkJBRkYsQUFHSSxBQUNGO3NCQWpCTixBQUFjLEFBYVYsQUFJUSxBQUlaO0FBUkksQUFDRTs7aURBT0MsQUFBQyxzQkFBRCxBQUFNLFNBQU0sT0FBWixBQUFtQjs4QkFBbkI7Z0NBQVAsQUFBTyxBQUNWO0FBRFU7YUFBQTs7OztpQ0FHRixBQUNMO21DQUNBLEFBQUM7OzhCQUFEO2dDQUFBLEFBQ0k7QUFESjtBQUFBLGFBQUEsa0JBQ0ksY0FBQTs7OEJBQUE7Z0NBQUEsQUFFSTtBQUZKO0FBQUEsK0JBRUksY0FBQTs7OEJBQUE7Z0NBQUE7QUFBQTtBQUFBLGVBRkosQUFFSSxBQUVBLG1DQUFBLEFBQUMsOEJBQUssT0FBTixBQUFZOzhCQUFaO2dDQUFBLEFBQ0k7QUFESjsrQkFDSSxjQUFBOzs4QkFBQTtnQ0FBQSxBQUNJO0FBREo7QUFBQSwrQkFDSSxBQUFDLHlDQUFPLFNBQVIsQUFBZ0IsU0FBUSxTQUF4QixBQUFnQyxtQkFBa0IsTUFBbEQsQUFBdUQsY0FBYSxTQUFwRTs4QkFBQTtnQ0FOWixBQUlJLEFBQ0ksQUFDSSxBQU1OO0FBTk07dUJBUmhCLEFBQ0EsQUFDSSxBQVlNLEFBQUssQUFJbEI7Ozs7Ozs7Ozs7aUNBOURTO0EsNEMsQUFBWSxJQUFHOztpRUFFZCxFQUFFLFcsQUFBRjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQStEZixBLEFBcEU0Qjs7a0JBb0U1QixBQUFlIiwiZmlsZSI6ImluZGV4LmpzP2VudHJ5Iiwic291cmNlUm9vdCI6Ii9ob21lL21ybm9ib2R5L2dpdGh1Yi9TYWxlc1RvZ2V0aGVyL2FwcCJ9