import { ResponseStatusEnum } from '@core/enums';
import { ResponseBuilder } from '@core/lib/responder/builders';
import { ResponseTime } from '@core/lib/responder/response-time';

export const responder = function (
    res: any,
    code: any = 200,
    status: any = ResponseStatusEnum.SUCCESS,
    message: any = ''
) {
    return new ResponseBuilder(res, code, status, message);
};

export const responseTime: ResponseTime = new ResponseTime();
