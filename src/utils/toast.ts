import { toast, ToastOptions } from 'react-toastify';

const defaultOptions: ToastOptions = {
  position: 'bottom-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'dark',
  style: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    color: '#ffffff',
  },
};

export const showSuccessToast = (message: string) => {
  toast.success(message, defaultOptions);
};

export const showErrorToast = (message: string) => {
  toast.error(message, defaultOptions);
};

export const showInfoToast = (message: string) => {
  toast.info(message, defaultOptions);
};

export const showWarningToast = (message: string) => {
  toast.warning(message, defaultOptions);
};

export const showToast = {
  success: showSuccessToast,
  error: showErrorToast,
  info: showInfoToast,
  warning: showWarningToast,
};
