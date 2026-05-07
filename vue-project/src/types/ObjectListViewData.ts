import type { ObjectListObjectType } from "@/enums/ObjectListObjectType";
import type { CustomModalElement } from "./CustomModalElement";

export interface ObjectListViewData {
    objectName: string,
    objectType: ObjectListObjectType
    customGetPath?: string | null,
    customAddPath?: string | null,
    customUpdatePath?: string | null,
    customDeletePath?: string | null,
    title: string,
    icon: string,

    customObjectModalElements?: CustomModalElement[] | null,
    modalIgnoredProperties?: string[] | null,
}