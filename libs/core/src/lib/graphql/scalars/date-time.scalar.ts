import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('DateTime', () => Date)
export class DateTimeScalar implements CustomScalar<string, Date> {
  description =
    'A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format.';

  parseValue(value: number | string | Date) {
    return new Date(value);
  }

  serialize(value: unknown) {
    let date = value;

    if (typeof value === 'string') {
      date = new Date(value);
    }

    if (date instanceof Date && !isNaN(date.getTime())) {
      return date.toISOString();
    }

    return null;
  }

  parseLiteral(ast: ValueNode) {
    return ast.kind === Kind.STRING ? new Date(ast.value) : null;
  }
}
