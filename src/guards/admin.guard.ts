import {CanActivate, ExecutionContext} from "@nestjs/common";
import {AuthGuard} from "./auth.guard";

export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        if(!request.currentUser) return false;
        return request.currentUser.admin;
    }
}