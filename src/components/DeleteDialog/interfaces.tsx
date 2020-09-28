export interface IDeleteDialog {
  open: boolean;
  close(): void;
  deletePost(): void;
}
