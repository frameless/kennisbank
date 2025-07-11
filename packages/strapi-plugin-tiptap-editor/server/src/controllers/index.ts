import controller from './controller';

const exportedControllers = {
  controller,
} as keyof typeof controller;

export default exportedControllers;
