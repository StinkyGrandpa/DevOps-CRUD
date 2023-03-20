import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UserService } from "src/app/services/user.service";

@Component({
    templateUrl: "./users-index.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserIndexView {
    
    constructor(
        private readonly usersService: UserService
    ) {}

}