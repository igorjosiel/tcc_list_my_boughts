import { Category, Priority } from "../../utils/interfaces";
export default interface ScrollViewProps {
  data: Category[] | Priority[];
  scrollName: "category" | "priority";
  onSelected: (parameter: string) => void;
  setPropertyNewProduct: (value: string | number | boolean | null, property: string) => void;
}
