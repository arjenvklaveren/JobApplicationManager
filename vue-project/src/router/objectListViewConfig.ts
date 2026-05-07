import SearchObjectRefItem from "@/components/object-popup-items/SearchObjectRefItem.vue";
import { ObjectListObjectType } from "@/enums/ObjectListObjectType";
import type { ObjectListViewData } from "@/types/ObjectListViewData";

const objectListViewConfig: Record<ObjectListObjectType, ObjectListViewData> = {
  [ObjectListObjectType.Companies]: {
    objectName: "company",
    title: "Companies",
    icon: "company",
    objectType: ObjectListObjectType.Companies,
    modalIgnoredProperties: ['id', 'notes']
  },

  [ObjectListObjectType.Positions]: {
    objectName: "position",
    title: "Positions",
    icon: "positions",
    customObjectModalElements: [
      {
        component: SearchObjectRefItem,
        props: {
            refObjectMainKey: "company",
            refObjectDisplayKey: "name",
            propertyLabel: "company",
            fetchUrl: "company/get-all"    
        }
      },
    ],
    modalIgnoredProperties: ["id", "company"],
    objectType: ObjectListObjectType.Positions,
  },

  [ObjectListObjectType.Applications]: {
    objectName: "application",
    title: "Applications",
    icon: "applications",
    objectType: ObjectListObjectType.Applications,
  },
};

export function getObjectListViewData(
  objectListViewType: ObjectListObjectType,
): ObjectListViewData {
  return objectListViewConfig[objectListViewType];
}
