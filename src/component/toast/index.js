import {showMessage} from 'react-native-flash-message';

// Main Toast View
class Toast {
  static Message = function(title, message, color) {
    showMessage({
      message: title ? title : '',
      description: message ? message : '',
      backgroundColor: color,
      duration: 3000,
    });
  };
}

export default Toast;
