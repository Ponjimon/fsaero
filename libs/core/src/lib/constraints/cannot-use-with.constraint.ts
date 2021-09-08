import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class CannotUseWith implements ValidatorConstraintInterface {
  validate(value: unknown, args: ValidationArguments): boolean {
    const object = args.object as any;
    return args.constraints.every(propertyName => {
      return object[propertyName] === undefined;
    });
  }

  defaultMessage(args: ValidationArguments): string {
    return `Cannot be used with \`${args.constraints.join('` , `')}\`.`;
  }
}
