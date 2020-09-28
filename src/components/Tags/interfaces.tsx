export interface ITags {
  titleClassNames?: string;
  tagsList?: string[];
  tagContainerClass?: string;
  addTag(): void;
  deleteTag(index: number): void;
  onTagNameChange(index: number, value: string): void;
}
