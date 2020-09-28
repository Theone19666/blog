import { IObject } from "../../interfaces";

export interface IFormField {
  title: string;
  inputType?: string;
  name: string;
  placeholder: string;
  titleClassNames: string;
  inputClassNames: string;
  onInput?(): void;
  defaultValue?: string;
  type?: string;
  rules?: IObject;
}
