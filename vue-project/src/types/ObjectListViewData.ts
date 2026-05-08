import type { ObjectListObjectType } from "@/enums/ObjectListObjectType";
import type { CustomModalElement } from "./CustomModalElement";
import type { ListObjectRedirectData } from "./ListObjectRedirectData";

export interface ObjectListViewData {
    objectName: string,
    objectType: ObjectListObjectType
    customGetPath?: string | null,
    customAddPath?: string | null,
    customUpdatePath?: string | null,
    customDeletePath?: string | null,
    title: string,
    icon: string,

    propertyRedirectData?: ListObjectRedirectData[] | null;

    customObjectModalElements?: CustomModalElement[] | null,
    modalIgnoredProperties?: string[] | null,
}