import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { combineLatest, map, Observable, startWith, Subject, switchMap } from "rxjs";
import { UserEditorDialogComponent } from "src/app/dialogs/user-editor-dialog/user-editor-dialog.component";
import { User } from "src/app/modules/authentication/entities/user.entity";
import { AuthenticationService } from "src/app/modules/authentication/services/authentication.service";
import { UserService } from "src/app/services/user.service";

interface UserIndexProps {
    loading?: boolean;
    users?: User[];
    user?: User;
}

@Component({
    templateUrl: "./users-index.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserIndexViewComponent {

    public displayedColumns: string[] = ['username', 'firstName', 'lastName', 'age', 'actions'];

    constructor(
        private readonly usersService: UserService,
        private readonly auth: AuthenticationService,
        private readonly dialog: MatDialog
    ) { }

    private readonly $onReload: Subject<void> = new Subject();

    public $props: Observable<UserIndexProps> = combineLatest([
        this.auth.$user,
        this.$onReload.pipe(
            //startwert
            startWith(null),
            //für die nächte pipe
            switchMap(() => {
                return this.usersService.findAll();
            })
        )
    ]).pipe(
        map(([user, usersRequest]): UserIndexProps => {
            const list: User[] = usersRequest.data ?? [];

            return {
                loading: usersRequest.loading,
                users: list,
                user: user
            }
        }),
    );

    public openCreateUserDialog() {
        const dialogRef = this.dialog.open(UserEditorDialogComponent);
        dialogRef.afterClosed().subscribe((result: User) => {
            if (typeof result === "object") {
                this.$onReload.next();
            }
        });
    }

    public deleteUser(id: string) {
        this.usersService.deleteById(id).subscribe((request) => {
            if (request.loading) return;
            if (request.error) return;

            if (request.data) {
                // Remove user from list on success
                this.$onReload.next();
            }
        })
    }

    public lock(user: User) {
        user.enabled = false
        this.usersService.lockById(user.id).subscribe()
    }

    public unlock(user: User) {
        user.enabled = true
        this.usersService.unlockById(user.id).subscribe()
    }

    public edit(user: User) {
        const dialogRef = this.dialog.open(UserEditorDialogComponent, { data: user });
        dialogRef.afterClosed().subscribe((result: User) => {
            if (typeof result === "object") {
                this.$onReload.next();
            }
        });


    }
    openDocs() {
        window.open('./api/')
    }
}