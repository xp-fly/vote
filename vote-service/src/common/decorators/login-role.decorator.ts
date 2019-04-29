import {SetMetadata} from '@nestjs/common';

export const LoginRole = (...roles: number[]) => SetMetadata('roles', roles);
