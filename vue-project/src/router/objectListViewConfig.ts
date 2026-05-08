import SearchObjectRefItem from "@/components/object-popup-items/SearchObjectRefItem.vue";
import { ObjectListObjectType } from "@/enums/ObjectListObjectType";
import type { ObjectListViewData } from "@/types/ObjectListViewData";

const objectListViewConfig: Record<ObjectListObjectType, ObjectListViewData> = {
  [ObjectListObjectType.Companies]: {
    objectName: "company",
    title: "Companies",
    icon: "company",
    objectType: ObjectListObjectType.Companies,
    propertyRedirectData: [
      {
        sourcePropertyName: "positions",
        redirectUrl: "https://google.com",
      }
    ],
    modalIgnoredProperties: ['id', 'notes'],
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
  
  [ObjectListObjectType.Tasks]: {
    objectName: "",
    title: "",
    icon: "",
    objectType: ObjectListObjectType.Tasks
  }
};

export function getObjectListViewData(
  objectListViewType: ObjectListObjectType,
): ObjectListViewData {
  return objectListViewConfig[objectListViewType];
}

export function getObjectListObjectTypeByName(objectName: string): ObjectListObjectType | undefined {
  return Object.values(objectListViewConfig).find(
    (config) => config.objectName === objectName
  )?.objectType;
}
