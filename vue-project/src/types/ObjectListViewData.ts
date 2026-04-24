import type { ObjectListObjectType } from "@/enums/ObjectListObjectType";

export interface ObjectListViewData {
    objectName: string,
    objectType: ObjectListObjectType
    customGetPath?: string | null,
    customAddPath?: string | null,
    customUpdatePath?: string | null,
    customDeletePath?: string | null,
    title: string,
    icon: string,
}