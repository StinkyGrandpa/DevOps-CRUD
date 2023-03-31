import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { combineLatest, map, Observable, startWith, Subject, switchMap } from "rxjs";
import { UserEditorDialog } from "src/app/dialogs/user-editor-dialog/user-editor-dialog.component";
import { IUser } from "src/app/entities/user.entity";
import { UserService } from "src/app/services/user.service";

interface UserIndexProps {
    loading?: boolean;
    users?: IUser[];
}

@Component({
    templateUrl: "./users-index.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserIndexView {

    public displayedColumns: string[] = ['firstName', 'lastName', 'age', 'actions'];

    constructor(
        private readonly usersService: UserService,
        private readonly dialog: MatDialog
    ) { }

    private readonly $onReload: Subject<void> = new Subject();

    public $props: Observable<UserIndexProps> = combineLatest([
        this.$onReload.pipe(
            startWith(null),
            switchMap(() => {
                return this.usersService.findAll();
            })
        )
    ]).pipe(
        map(([usersRequest]): UserIndexProps => {
            let list: IUser[] = usersRequest.data ?? [];

            return {
                loading: usersRequest.loading,
                users: list
            }
        }),
    );

    public openCreateUserDialog() {
        const dialogRef = this.dialog.open(UserEditorDialog);
        dialogRef.afterClosed().subscribe((result: IUser) => {
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

    public lock(user: IUser) {
        user.enabled = false
        this.usersService.lockById(user.id).subscribe()
    }

    public unlock(user: IUser) {
        user.enabled = true
        this.usersService.unlockById(user.id).subscribe()
    }

    public edit(user: IUser) {
        const dialogRef = this.dialog.open(UserEditorDialog, { data: user });
        dialogRef.afterClosed().subscribe((result: IUser) => {
            if (typeof result === "object") {
                this.$onReload.next();
            }
        });


    }
}