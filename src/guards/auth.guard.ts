import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";

export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        return request.session.userId;
    }
}