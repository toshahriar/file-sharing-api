import { LogBuilder } from '@core/lib/logger/builders';
import { LogStatusEnum } from '@core/lib/logger/enums';

export const logger = function (
    tag: any = '',
    message: any = '',
    data: any = '',
    level = LogStatusEnum.INFO
) {
    return new LogBuilder(level, tag, message, data);
};
