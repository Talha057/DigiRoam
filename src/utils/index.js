import {Dimensions} from 'react-native';

export const {width, height} = Dimensions.get('window');
export const formatDataSize = bytes => {
  if (!bytes) return '';
  const MB = 1024 * 1024; // 1 MB = 1,048,576 bytes
  const GB = 1024 * 1024 * 1024; // 1 GB = 1,073,741,824 bytes

  if (bytes < GB) {
    return `${(bytes / MB).toFixed(0)} MB`; // Show in MB if less than 1 GB
  } else {
    return `${(bytes / GB).toFixed(1)} GB`; // Show in GB if 1GB or more
  }
};
