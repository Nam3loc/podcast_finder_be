import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isMilitaryTimeWithSeconds', async: false })
export class IsMilitaryTimeWithSeconds implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        // Regular expression for matching HH:MM:SS format
        const militaryTimeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

        if (typeof value !== 'string' || !value.match(militaryTimeRegex)) {
            return false;
        }
        return true;
    }

    defaultMessage(args: ValidationArguments) {
        return `${args.property} must be a valid representation of military time with seconds in the format HH:MM:SS`;
    }
}