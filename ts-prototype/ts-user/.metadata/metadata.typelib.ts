/*
* This file is generated automatically by the RTTIST TypeGen tool.
* Do not edit it manually.
*/
import { type Type, type MetadataLibrary, type MetadataContextHelpers, ModuleImporter, createCallsite, resolveFromFunctionCallsite, getClassTypeParameter } from "rttist";

// Typelibs of depdendencies


// @ts-ignore; !! CONFIGURE THIS AS AN EXTERNAL DEPENDENCY !!
import { Metadata as InternalMetadataLibrary } from "./internal.typelib";

ModuleImporter.registerImporters({
	"@ts-user/index": () => import("./../src/index"),
});

export const getType: MetadataLibrary["getType"] = InternalMetadataLibrary.getType;
export const resolveType: MetadataLibrary["resolveType"] = InternalMetadataLibrary.resolveType;
export const _: MetadataContextHelpers = {
	cs$: createCallsite,
	resFnCs$: (fn, mappers) => resolveFromFunctionCallsite(fn, mappers, InternalMetadataLibrary),
	getTP$: getClassTypeParameter,
	getGC$: InternalMetadataLibrary.getGenericClass,
	cg$: InternalMetadataLibrary.constructGeneric
};
/** @internal */
export const Metadata: MetadataLibrary = InternalMetadataLibrary;