use rquickjs::JsLifetime;
use rquickjs::class::{JsClass, Trace};
use std::ops::Deref;
pub mod wasi_io_0_2_3_poll;
pub mod wasi_clocks_0_2_3_monotonic_clock;
pub mod wasi_clocks_0_2_3_wall_clock;
pub mod golem_rpc_0_2_1_types;
pub mod golem_agent_common;
pub mod golem_api_1_1_7_host;
pub fn add_native_module_resolvers(
    resolver: rquickjs::loader::BuiltinResolver,
) -> rquickjs::loader::BuiltinResolver {
    resolver
        .with_module("wasi:io/poll@0.2.3")
        .with_module("wasi:clocks/monotonic-clock@0.2.3")
        .with_module("wasi:clocks/wall-clock@0.2.3")
        .with_module("golem:rpc/types@0.2.1")
        .with_module("golem:agent/common")
        .with_module("golem:api/host@1.1.7")
}
pub fn module_loader() -> rquickjs::loader::ModuleLoader {
    rquickjs::loader::ModuleLoader::default()
        .with_module(
            "wasi:io/poll@0.2.3",
            crate::modules::wasi_io_0_2_3_poll::JsPollModule,
        )
        .with_module(
            "wasi:clocks/monotonic-clock@0.2.3",
            crate::modules::wasi_clocks_0_2_3_monotonic_clock::JsMonotonicClockModule,
        )
        .with_module(
            "wasi:clocks/wall-clock@0.2.3",
            crate::modules::wasi_clocks_0_2_3_wall_clock::JsWallClockModule,
        )
        .with_module(
            "golem:rpc/types@0.2.1",
            crate::modules::golem_rpc_0_2_1_types::JsTypesModule,
        )
        .with_module(
            "golem:agent/common",
            crate::modules::golem_agent_common::JsCommonModule,
        )
        .with_module(
            "golem:api/host@1.1.7",
            crate::modules::golem_api_1_1_7_host::JsHostModule,
        )
}
pub struct JsAgenticGuestModule;
impl rquickjs::module::ModuleDef for JsAgenticGuestModule {
    fn declare(decl: &rquickjs::module::Declarations) -> rquickjs::Result<()> {
        Ok(())
    }
    fn evaluate<'js>(
        ctx: &rquickjs::Ctx<'js>,
        exports: &rquickjs::module::Exports<'js>,
    ) -> rquickjs::Result<()> {
        Ok(())
    }
}
