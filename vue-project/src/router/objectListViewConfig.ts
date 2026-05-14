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
        redirectUrl: "/positions",
      }
    ],
    modalIgnoredProperties: ['id', 'notes'],
  },

  [ObjectListObjectType.Positions]: {
    objectName: "position",
    title: "Positions",
    icon: "position",
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
    icon: "application",
    objectType: ObjectListObjectType.Applications,
  },

  [ObjectListObjectType.Appointments]: {
    objectName: "appointment",
    title: "Appointments",
    icon: "appointment",
    objectType: ObjectListObjectType.Applications,
  },

  [ObjectListObjectType.ContactPerson]: {
    objectName: "contact-person",
    title: "Contact People",
    icon: "contact-people",
    objectType: ObjectListObjectType.ContactPerson,
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
