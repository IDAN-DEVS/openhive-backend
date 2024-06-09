import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsTimeFormat(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isTimeFormat',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === 'string' && /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid time string in the format HH:mm`;
        },
      },
    });
  };
}
