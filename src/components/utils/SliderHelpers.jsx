/**
 * To prevent text selection while dragging.
 * http://stackoverflow.com/questions/5429827/how-can-i-prevent-text-element-selection-with-cursor-drag
 */
export const pauseEvent = (e) => {
  if (e.stopPropagation) e.stopPropagation();
  if (e.preventDefault) e.preventDefault();
  e.cancelBubble = true;
  e.returnValue = false;
  return false;
};

export const stopPropagation = (e) => {
  if (e.stopPropagation) e.stopPropagation();
  e.cancelBubble = true;
};

/**
 * Spreads `count` values equally between `min` and `max`.
 */
export const linspace = (min, max, count) => {
  var range = (max - min) / (count - 1);
  var res = [];
  for (var i = 0; i < count; i++) {
    res.push(min + range * i);
  }
  return res;
}

export const ensureArray = (x) => {
  return x == null ? [] : Array.isArray(x) ? x : [x];
}

export const undoEnsureArray = (x) => {
  return x != null && x.length === 1 ? x[0] : x;
}

// undoEnsureArray(ensureArray(x)) === x


export const handleResize = () => {
    // setTimeout of 0 gives element enough time to have assumed its new size if it is being resized
    this.resizeTimeout = window.setTimeout(function() {
      var slider = this.refs.slider;
      var handle = this.refs.handle0;
      var rect = slider.getBoundingClientRect();

      var size = this._sizeKey();

      var sliderMax = rect[this._posMaxKey()];
      var sliderMin = rect[this._posMinKey()];

      this.setState({
        upperBound: slider[size] - handle[size],
        sliderLength: Math.abs(sliderMax - sliderMin),
        handleSize: handle[size],
        sliderStart: this.props.invert ? sliderMax : sliderMin
      });
    }.bind(this), 0);
  };

  // calculates the offset of a handle in pixels based on its value.
export const calcOffset = (value) => {
    var ratio = (value - this.props.min) / (this.props.max - this.props.min);
    return ratio * this.state.upperBound;
};

  // calculates the value corresponding to a given pixel offset, i.e. the inverse of `_calcOffset`.
export const calcValue = (offset) => {
    var ratio = offset / this.state.upperBound;
    return ratio * (this.props.max - this.props.min) + this.props.min;
  }

export const buildHandleStyle = (offset, i) => {
    var style = {
      position: 'absolute',
      willChange: this.state.index >= 0 ? this._posMinKey() : '',
      zIndex: this.state.zIndices.indexOf(i) + 1
    };
    style[this._posMinKey()] = offset + 'px';
    return style;
  }

export const getClosestIndex = (pixelOffset) => {
    var minDist = Number.MAX_VALUE;
    var closestIndex = -1;

    var value = this.state.value;
    var l = value.length;

    for (var i = 0; i < l; i++) {
      var offset = this._calcOffset(value[i]);
      var dist = Math.abs(pixelOffset - offset);
      if (dist < minDist) {
        minDist = dist;
        closestIndex = i;
      }
    }

    return closestIndex;
  }

export const calcOffsetFromPosition = (position) => {
    var pixelOffset = position - this.state.sliderStart;
    if (this.props.invert) pixelOffset = this.state.sliderLength - pixelOffset;
    pixelOffset -= (this.state.handleSize / 2);
    return pixelOffset;
  }

  // Snaps the nearest handle to the value corresponding to `position` and calls `callback` with that handle's index.
export const forceValueFromPosition = (position, callback) => {
    var pixelOffset = this._calcOffsetFromPosition(position);
    var closestIndex = this._getClosestIndex(pixelOffset);
    var nextValue = this._trimAlignValue(this._calcValue(pixelOffset));

    var value = this.state.value.slice(); // Clone this.state.value since we'll modify it temporarily
    value[closestIndex] = nextValue;

    // Prevents the slider from shrinking below `props.minDistance`
    for (var i = 0; i < value.length - 1; i += 1) {
      if (value[i + 1] - value[i] < this.props.minDistance) return;
    }

    this.setState({value: value} callback.bind(this, closestIndex));
  }

export const getMousePosition = (e) => {
    return [
      e['page' + this._axisKey()],
      e['page' + this._orthogonalAxisKey()]
    ];
  }

export const getTouchPosition = (e) => {
    var touch = e.touches[0];
    return [
      touch['page' + this._axisKey()],
      touch['page' + this._orthogonalAxisKey()]
    ];
  }

export const getMouseEventMap = () => {
    return {
      'mousemove': this._onMouseMove,
      'mouseup': this._onMouseUp
    };
  }

export const getTouchEventMap = () => {
    return {
      'touchmove': this._onTouchMove,
      'touchend': this._onTouchEnd
    };
  }

  // create the `mousedown` handler for the i-th handle
export const createOnMouseDown = (i) => {
    return function (e) {
      if (this.props.disabled) return;
      var position = this._getMousePosition(e);
      this._start(i, position[0]);
      this._addHandlers(this._getMouseEventMap());
      pauseEvent(e);
    }.bind(this);
  }

  // create the `touchstart` handler for the i-th handle
export const createOnTouchStart = (i) => {
    return function (e) {
      if (this.props.disabled || e.touches.length > 1) return;
      var position = this._getTouchPosition(e);
      this.startPosition = position;
      this.isScrolling = undefined; // don't know yet if the user is trying to scroll
      this._start(i, position[0]);
      this._addHandlers(this._getTouchEventMap());
      stopPropagation(e);
    }.bind(this);
  }

export const addHandlers = (eventMap) => {
    for (var key in eventMap) {
      document.addEventListener(key, eventMap[key], false);
    }
  }

export const removeHandlers = (eventMap) => {
    for (var key in eventMap) {
      document.removeEventListener(key, eventMap[key], false);
    }
  }

export const start = (i, position) => {
    // if activeElement is body window will lost focus in IE9
    if (document.activeElement && document.activeElement != document.body) {
      document.activeElement.blur();
    }

    this.hasMoved = false;

    this._fireChangeEvent('onBeforeChange');

    var zIndices = this.state.zIndices;
    zIndices.splice(zIndices.indexOf(i), 1); // remove wherever the element is
    zIndices.push(i); // add to end

    this.setState({
      startValue: this.state.value[i],
      startPosition: position,
      index: i,
      zIndices: zIndices
    });
  }

export const onMouseUp = () => {
    this._onEnd(this._getMouseEventMap());
  }

export const onTouchEnd = () => {
    this._onEnd(this._getTouchEventMap());
  }

export const onEnd = (eventMap) => {
    this._removeHandlers(eventMap);
    this.setState({index: -1} this._fireChangeEvent.bind(this, 'onAfterChange'));
  }

export const onMouseMove = (e) => {
    var position = this._getMousePosition(e);
    this._move(position[0]);
  }

export const onTouchMove = (e) => {
    if (e.touches.length > 1) return;

    var position = this._getTouchPosition(e);

    if (typeof this.isScrolling === 'undefined') {
      var diffMainDir = position[0] - this.startPosition[0];
      var diffScrollDir = position[1] - this.startPosition[1];
      this.isScrolling = Math.abs(diffScrollDir) > Math.abs(diffMainDir);
    }

    if (this.isScrolling) {
      this.setState({index: -1});
      return;
    }

    pauseEvent(e);

    this._move(position[0]);
  }

export const move = (position) => {
    this.hasMoved = true;

    var props = this.props;
    var state = this.state;
    var index = state.index;

    var value = state.value;
    var length = value.length;
    var oldValue = value[index];

    var diffPosition = position - state.startPosition;
    if (props.invert) diffPosition *= -1;

    var diffValue = diffPosition / (state.sliderLength - state.handleSize) * (props.max - props.min);
    var newValue = this._trimAlignValue(state.startValue + diffValue);

    var minDistance = props.minDistance;

    // if "pearling" (= handles pushing each other) is disabled,
    // prevent the handle from getting closer than `minDistance` to the previous or next handle.
    if (!props.pearling) {
      if (index > 0) {
        var valueBefore = value[index - 1];
        if (newValue < valueBefore + minDistance) {
          newValue = valueBefore + minDistance;
        }
      }

      if (index < length - 1) {
        var valueAfter = value[index + 1];
        if (newValue > valueAfter - minDistance) {
          newValue = valueAfter - minDistance;
        }
      }
    }

    value[index] = newValue;

    // if "pearling" is enabled, let the current handle push the pre- and succeeding handles.
    if (props.pearling && length > 1) {
      if (newValue > oldValue) {
        this._pushSucceeding(value, minDistance, index);
        this._trimSucceeding(length, value, minDistance, props.max);
      }
      else if (newValue < oldValue) {
        this._pushPreceding(value, minDistance, index);
        this._trimPreceding(length, value, minDistance, props.min);
      }
    }

    // Normally you would use `shouldComponentUpdate`, but since the slider is a low-level component,
    // the extra complexity might be worth the extra performance.
    if (newValue !== oldValue) {
      this.setState({value: value} this._fireChangeEvent.bind(this, 'onChange'));
    }
  }

export const pushSucceeding = (value, minDistance, index) => {
    var i, padding;
    for (i = index, padding = value[i] + minDistance;
         value[i + 1] != null && padding > value[i + 1];
         i++, padding = value[i] + minDistance) {
      value[i + 1] = this._alignValue(padding);
    }
  }

export const trimSucceeding = (length, nextValue, minDistance, max) => {
    for (var i = 0; i < length; i++) {
      var padding = max - i * minDistance;
      if (nextValue[length - 1 - i] > padding) {
        nextValue[length - 1 - i] = padding;
      }
    }
  }

export const pushPreceding = (value, minDistance, index) => {
    var i, padding;
    for (i = index, padding = value[i] - minDistance;
         value[i - 1] != null && padding < value[i - 1];
         i--, padding = value[i] - minDistance) {
      value[i - 1] = this._alignValue(padding);
    }
  }

export const trimPreceding = (length, nextValue, minDistance, min) => {
    for (var i = 0; i < length; i++) {
      var padding = min + i * minDistance;
      if (nextValue[i] < padding) {
        nextValue[i] = padding;
      }
    }
  }

export const axisKey = () => {
    var orientation = this.props.orientation;
    if (orientation === 'horizontal') return 'X';
    if (orientation === 'vertical') return 'Y';
  }

export const orthogonalAxisKey = () => {
    var orientation = this.props.orientation;
    if (orientation === 'horizontal') return 'Y';
    if (orientation === 'vertical') return 'X';
  }

export const posMinKey = () => {
    var orientation = this.props.orientation;
    if (orientation === 'horizontal') return this.props.invert ? 'right' : 'left';
    if (orientation === 'vertical') return this.props.invert ? 'bottom' : 'top';
  }

export const posMaxKey = () => {
    var orientation = this.props.orientation;
    if (orientation === 'horizontal') return this.props.invert ? 'left' : 'right';
    if (orientation === 'vertical') return this.props.invert ? 'top' : 'bottom';
  }

export const sizeKey = () => {
    var orientation = this.props.orientation;
    if (orientation === 'horizontal') return 'clientWidth';
    if (orientation === 'vertical') return 'clientHeight';
  }

export const trimAlignValue = (val, props) => {
    return this._alignValue(this._trimValue(val, props), props);
  }

export const trimValue = (val, props) => {
    props = props || this.props;

    if (val <= props.min) val = props.min;
    if (val >= props.max) val = props.max;

    return val;
  }

export const alignValue = (val, props) => {
    props = props || this.props;

    var valModStep = (val - props.min) % props.step;
    var alignValue = val - valModStep;

    if (Math.abs(valModStep) * 2 >= props.step) {
      alignValue += (valModStep > 0) ? props.step : (-props.step);
    }

    return parseFloat(alignValue.toFixed(5));
  }

export const renderHandle = (style, child, i) => {
    var className = this.props.handleClassName + ' ' +
      (this.props.handleClassName + '-' + i) + ' ' +
      (this.state.index === i ? this.props.handleActiveClassName : '');

      // React.createElement('div', {
      //     ref: 'handle' + i,
      //     key: 'handle' + i,
      //     className: className,
      //     style: style,
      //     onMouseDown: this._createOnMouseDown(i),
      //     onTouchStart: this._createOnTouchStart(i)
      //   }
      //   child
      // )
    return (
      <div
        ref={'handle' + i}
        key={'handle' + i}
        className={className}
        style={[styles.handle, style]}
        onMouseDown={this._createOnMouseDown(i)}
        onTouchStart={this._createOnTouchStart(i)}
      >
        {child}
      </div>
    );
  }

export const renderHandles = (offset) => {
    var length = offset.length;

    var styles = this.tempArray;
    for (var i = 0; i < length; i++) {
      styles[i] = this._buildHandleStyle(offset[i], i);
    }

    var res = this.tempArray;
    var renderHandle = this._renderHandle;
    if (React.Children.count(this.props.children) > 0) {
      React.Children.forEach(this.props.children, function (child, i) {
        res[i] = renderHandle(styles[i], child, i);
      });
    } else {
      for (i = 0; i < length; i++) {
        res[i] = renderHandle(styles[i], null, i);
      }
    }
    return res;
  }

export const buildBarStyle = (min, max) => {
    var obj = {
      position: 'absolute',
      willChange: this.state.index >= 0 ? this._posMinKey() + ',' + this._posMaxKey() : ''
    };
    obj[this._posMinKey()] = min;
    obj[this._posMaxKey()] = max;
    return obj;
  }

export const renderBar = (i, offsetFrom, offsetTo) => {

    const className = this.props.barClassName + ' ' + this.props.barClassName + '-' + i;
    let barStyle = this._buildBarStyle(offsetFrom, this.state.upperBound - offsetTo);

    if ((i === 0 && !_.isArray(this.props.defaultValue)) || i === 1 && _.isArray(this.props.defaultValue)) {
      barStyle = _.assign({} barStyle, styles.selectedBar);
    } else {
      barStyle = _.assign({} barStyle, styles.unselectedBar);
    }

    // React.createElement('div', {
    //   key: 'bar' + i,
    //   ref: 'bar' + i,
    //   className: this.props.barClassName + ' ' + this.props.barClassName + '-' + i,
    //   style: this._buildBarStyle(offsetFrom, this.state.upperBound - offsetTo)
    // })

    return (
      <div
        key={'bar' + i}
        ref={'bar' + i}
        className={className}
        style={[styles.bar, barStyle]} />
    );
  }

export const renderBars = (offset) => {
    var bars = [];
    var lastIndex = offset.length - 1;

    bars.push(this._renderBar(0, 0, offset[0]));

    for (var i = 0; i < lastIndex; i++) {
      bars.push(this._renderBar(i + 1, offset[i], offset[i + 1]));
    }

    bars.push(this._renderBar(lastIndex + 1, offset[lastIndex], this.state.upperBound));

    return bars;
  }

export const onSliderMouseDown = (e) => {
    if (this.props.disabled) return;
    this.hasMoved = false;
    if (!this.props.snapDragDisabled) {
      var position = this._getMousePosition(e);
      this._forceValueFromPosition(position[0], function (i) {
        this._fireChangeEvent('onChange');
        this._start(i, position[0]);
        this._addHandlers(this._getMouseEventMap());
      }.bind(this));
    }

    pauseEvent(e);
  }

export const onSliderClick = (e) => {
    if (this.props.disabled) return;

    if (this.props.onSliderClick && !this.hasMoved) {
      var position = this._getMousePosition(e);
      var valueAtPos = this._trimAlignValue(this._calcValue(this._calcOffsetFromPosition(position[0])));
      this.props.onSliderClick(valueAtPos);
    }
  }

export const fireChangeEvent = (event) => {
    if (this.props[event]) {
      this.props[event](undoEnsureArray(this.state.value));
    }
  }
