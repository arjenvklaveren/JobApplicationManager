import type { ObjectListObjectType } from "@/enums/ObjectListObjectType";

export interface ObjectListViewData {
    controllerName: string,
    objectType: ObjectListObjectType
    customGetPath?: string | null,
    customAddPath?: string | null,
    customEditPath?: string | null,
    customDeletePath?: string | null,
    title: string,
    icon: string,
}