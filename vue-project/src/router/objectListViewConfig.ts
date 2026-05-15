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
    customObjectModalElements: [
      {
        component: SearchObjectRefItem,
        props: {
            refObjectMainKey: "position",
            refObjectDisplayKey: "title", 
        }
      },
    ],
    modalIgnoredProperties: ["id", "position"],
  },

  [ObjectListObjectType.Appointments]: {
    objectName: "appointment",
    title: "Appointments",
    icon: "appointment",
    objectType: ObjectListObjectType.Appointments,
    customObjectModalElements: [
      {
        component: SearchObjectRefItem,
        props: {
            refObjectMainKey: "company",
            refObjectDisplayKey: "name", 
        }
      },
    ]
  },

  [ObjectListObjectType.ContactPerson]: {
    objectName: "contact-person",
    title: "Contact People",
    icon: "contact-people",
    objectType: ObjectListObjectType.ContactPerson,
    customObjectModalElements: [
      {
        component: SearchObjectRefItem,
        props: {
            refObjectMainKey: "company",
            refObjectDisplayKey: "name", 
        }
      },
    ],
    modalIgnoredProperties: ["id", "company"],
  },
  
  [ObjectListObjectType.Tasks]: {
    objectName: "",
    title: "",
    icon: "",
    objectType: ObjectListObjectType.Tasks,
    modalIgnoredProperties: ["id"],
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
