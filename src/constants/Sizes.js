import {height, width} from '../utils';

const iphoneMaxHeight = 812;
const iphoneMaxWidth = 375;
const cachingYValue = {};
const cachingXValue = {};
const cachingValue = {};
export const scaleXValue = value => {
  if (!cachingYValue[`${value}`]) {
    const ratio = height / iphoneMaxHeight;
    const y = ratio > 1 ? value : value * ratio;
    cachingYValue[`${value}`] = y;
    return y;
  } else {
    return cachingYValue[value];
  }
};

export const scaleValue = value => {
  if (!cachingValue[`${value}`]) {
    const ratio = (height * width) / (iphoneMaxHeight * iphoneMaxWidth);
    const xy = ratio >= 1 ? value : value * ratio;
    cachingValue[`${value}`] = xy;
    return xy;
  } else {
    return cachingValue[value];
  }
};

export const scaleYValue = value => {
  if (!cachingXValue[`${value}`]) {
    const ratio = width / iphoneMaxWidth;
    const x = ratio >= 1 ? value : value * ratio;
    cachingXValue[`${value}`] = x;
    return x;
  } else {
    return cachingXValue[value];
  }
};
