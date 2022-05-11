import { Category } from "../../utils/interfaces";
export default interface ScrollViewProps {
  data: Category[];
  onSelected: (parameter: string) => void;
  setPropertyNewProduct: (value: string | number | boolean | null, property: string) => void;
}
