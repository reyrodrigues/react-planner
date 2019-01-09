'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var grabCircleRadius = 10;
var hoverCircleRadius = 14;
var rulerColor = '#f45c42';
var hoverColor = '#ff9900';

var grabCircleStyle = {
  cursor: 'grab',
  fill: rulerColor,
  transition: 'r 150ms ease-in'
};

var hoverCircleStyle = {
  cursor: 'grab',
  fill: hoverColor,
  transition: 'r 150ms ease-in'
};

var pointsDistance = function pointsDistance(x1, y1, x2, y2) {

  if (!isNaN(x1) && !isNaN(y1) && !isNaN(x2) && !isNaN(y2)) {
    if (!(x1 == 0 && y1 == 0 && x2 == 0 && y2 == 0)) {
      return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    }
  }

  return 0;
};

var ImageFul = function (_Component) {
  _inherits(ImageFul, _Component);

  function ImageFul(props) {
    _classCallCheck(this, ImageFul);

    var _this = _possibleConstructorReturn(this, (ImageFul.__proto__ || Object.getPrototypeOf(ImageFul)).call(this, props));

    _this.state = {
      handleMouseMove1: false,
      handleMouseMove2: false,
      hover1: false,
      hover2: false,
      imageLoadError: false
    };

    _this.onMouseDown = _this.onMouseDown.bind(_this);
    _this.onMouseMove = _this.onMouseMove.bind(_this);
    _this.toggleHover1 = _this.toggleHover1.bind(_this);
    _this.toggleHover2 = _this.toggleHover2.bind(_this);
    return _this;
  }

  _createClass(ImageFul, [{
    key: 'onMouseDown',
    value: function onMouseDown(event) {
      var target = event.viewerEvent.originalEvent.target;

      if (target.nodeName === 'circle') {
        if (target.attributes.name) {
          if (target.attributes.name.nodeValue === 'fst-anchor') {
            this.setState({ handleMouseMove1: !this.state.handleMouseMove1 });
          } else if (target.attributes.name.nodeValue === 'snd-anchor') {
            this.setState({ handleMouseMove2: !this.state.handleMouseMove2 });
          }
        }
      }
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(event) {
      var _event$viewerEvent = event.viewerEvent,
          x = _event$viewerEvent.x,
          y = _event$viewerEvent.y;


      y = this.props.scene.height - y;

      var dist = pointsDistance(this.props.x1, this.props.y1, this.props.x2, this.props.y2);
      var scale = !isNaN(dist) && dist ? this.props.distance.length / dist : 0;

      var origin = {
        x: this.props.element.x - this.props.width * scale / 2,
        y: this.props.element.y + this.props.height * scale / 2
      };

      var minX = origin.x + this.props.width * scale;
      var minY = origin.y - this.props.height * scale;

      if (x < origin.x) {
        x = origin.x;
      } else if (x > minX) {
        x = minX;
      }

      if (y > origin.y) {
        y = origin.y;
      } else if (y < minY) {
        y = minY;
      }

      var newX = x - origin.x;
      var newY = origin.y - y;

      if (this.state.handleMouseMove1) {
        var _dist = pointsDistance(newX, newY, this.props.x2, this.props.y2);
        this.context.projectActions.setProperties(new _immutable.Map({ x1: newX, y1: newY, distance: new _immutable.Map({ length: _dist }) }));
      } else if (this.state.handleMouseMove2) {
        var _dist2 = pointsDistance(this.props.x1, this.props.y1, newX, newY);
        this.context.projectActions.setProperties(new _immutable.Map({ x2: newX, y2: newY, distance: new _immutable.Map({ length: _dist2 }) }));
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      document.addEventListener('mousedown-planner-event', this.onMouseDown);
      document.addEventListener('mousemove-planner-event', this.onMouseMove);

      if (this.props.imageUri) {
        var img = new Image();
        img.src = this.props.imageUri;
        img.onload = function () {
          _this2.setState({ imageLoadError: false });
          _this2.context.projectActions.setProperties(new _immutable.Map({ width: img.naturalWidth, height: img.naturalHeight }));
        };
        img.onerror = function () {
          _this2.setState({ imageLoadError: true });
        };
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('mousedown-planner-event', this.onMouseDown);
      document.removeEventListener('mousemove-planner-event', this.onMouseMove);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      if (this.props.imageUri !== nextProps.imageUri) {
        var img = new Image();
        img.src = nextProps.imageUri;
        img.onload = function () {
          _this3.setState({ imageLoadError: false });
          _this3.context.projectActions.setProperties(new _immutable.Map({ width: img.naturalWidth, height: img.naturalHeight }));
        };
        img.onerror = function () {
          _this3.setState({ imageLoadError: true });
        };
      }
    }
  }, {
    key: 'toggleHover1',
    value: function toggleHover1(e) {
      this.setState({ hover1: !this.state.hover1 });
    }
  }, {
    key: 'toggleHover2',
    value: function toggleHover2(e) {
      this.setState({ hover2: !this.state.hover2 });
    }
  }, {
    key: 'render',
    value: function render() {
      var dist = pointsDistance(this.props.x1, this.props.y1, this.props.x2, this.props.y2);
      var scale = !isNaN(dist) && dist ? this.props.distance.length / dist : 0;
      var half_w = this.props.width / 2;

      var ruler = !this.props.element.selected ? null : _react2.default.createElement(
        'g',
        null,
        _react2.default.createElement('line', { key: '1', x1: this.props.x1, y1: this.props.y1, x2: this.props.x2, y2: this.props.y2, stroke: rulerColor,
          strokeWidth: '3px' }),
        _react2.default.createElement('circle', {
          onMouseEnter: this.toggleHover1,
          onMouseLeave: this.toggleHover1,
          key: '2',
          name: 'fst-anchor',
          cx: this.props.x1,
          cy: this.props.y1,
          r: this.state.hover1 || this.state.handleMouseMove1 ? hoverCircleRadius : grabCircleRadius,
          style: this.state.hover1 || this.state.handleMouseMove1 ? hoverCircleStyle : grabCircleStyle }),
        _react2.default.createElement('circle', {
          onMouseEnter: this.toggleHover2,
          onMouseLeave: this.toggleHover2,
          key: '3',
          name: 'snd-anchor',
          cx: this.props.x2,
          cy: this.props.y2,
          r: this.state.hover2 || this.state.handleMouseMove2 ? hoverCircleRadius : grabCircleRadius,
          style: this.state.hover2 || this.state.handleMouseMove2 ? hoverCircleStyle : grabCircleStyle })
      );

      return _react2.default.createElement(
        'g',
        {
          transform: 'scale(' + scale + ', ' + scale + '), scale(1,-1) translate(' + -this.props.width / 2 + ', ' + -this.props.height / 2 + ')' },
        this.props.imageUri && !this.state.imageLoadError ? _react2.default.createElement('image', {
          xlinkHref: this.props.imageUri,
          x: '0',
          y: '0',
          width: this.props.width,
          height: this.props.height
        }) : _react2.default.createElement(
          'g',
          null,
          _react2.default.createElement('rect', { x: '0', y: '0', width: this.props.width, height: this.props.height, fill: '#CCC' }),
          _react2.default.createElement(
            'text',
            {
              x: half_w,
              y: this.props.height / 2,
              textAnchor: 'middle',
              alignmentBaseline: 'central',
              fontFamily: 'Arial',
              fontSize: '35',
              fill: '#666'
            },
            _react2.default.createElement(
              'tspan',
              { x: half_w, dy: '-2em' },
              'Set the image url on the component'
            ),
            _react2.default.createElement(
              'tspan',
              { x: half_w, dy: '1em' },
              'property inside the sidebar,'
            ),
            _react2.default.createElement(
              'tspan',
              { x: half_w, dy: '1em' },
              'click and move each vertex'
            ),
            _react2.default.createElement(
              'tspan',
              { x: half_w, dy: '1em' },
              'of the ruler then set the real distance'
            ),
            _react2.default.createElement(
              'tspan',
              { x: half_w, dy: '1em' },
              'in the component property'
            )
          )
        ),
        ruler
      );
    }
  }]);

  return ImageFul;
}(_react.Component);

exports.default = ImageFul;


ImageFul.propTypes = {
  element: _propTypes2.default.object.isRequired,
  x1: _propTypes2.default.number.isRequired,
  y1: _propTypes2.default.number.isRequired,
  x2: _propTypes2.default.number.isRequired,
  y2: _propTypes2.default.number.isRequired,
  distance: _propTypes2.default.object.isRequired,
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  imageUri: _propTypes2.default.string.isRequired,
  layer: _propTypes2.default.object.isRequired,
  scene: _propTypes2.default.object.isRequired
};

ImageFul.contextTypes = {
  projectActions: _propTypes2.default.object.isRequired,
  catalog: _propTypes2.default.object.isRequired,
  translator: _propTypes2.default.object.isRequired
};